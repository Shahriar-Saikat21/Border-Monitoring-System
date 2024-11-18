import os
from channels.generic.websocket import AsyncWebsocketConsumer
import cv2
import numpy as np
import aiohttp
from ultralytics import YOLO
import torch
import asyncio

# Load YOLO model and classes
value = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(value, 'ML_Model/yolov10n.pt')
CLASSES_PATH = os.path.join(value, 'ML_Model/classes.txt')

try:
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    yolo_model = YOLO(MODEL_PATH).to(device)
    with open(CLASSES_PATH, 'r') as f:
        class_names = f.read().splitlines()
except Exception as e:
    yolo_model = None
    class_names = None
    print(f"Error loading model or classes: {e}")

class VideoStreamConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.active = True  # Flag to manage connection state
        await self.accept()
        asyncio.create_task(self.start_stream())  # Start video stream in the background

    async def disconnect(self, close_code):
        self.active = False  # Stop the stream
        print("WebSocket disconnected")

    async def receive(self, text_data=None, bytes_data=None):
        # Handle incoming client messages if needed
        pass

    async def start_stream(self):
        flask_video_url = 'http://127.0.0.1:5000/video_feed'
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(flask_video_url) as response:
                    if response.status != 200:
                        print(f"Error: Unable to access video feed. Status code: {response.status}")
                        await self.close()
                        return

                    byte_stream = b""
                    async for chunk in response.content.iter_chunked(8192):
                        if not self.active:  # Stop processing if disconnected
                            break

                        byte_stream += chunk
                        start_idx = byte_stream.find(b'\xff\xd8')  # JPEG start marker
                        end_idx = byte_stream.find(b'\xff\xd9')  # JPEG end marker

                        if start_idx != -1 and end_idx != -1:
                            jpeg_data = byte_stream[start_idx:end_idx + 2]
                            byte_stream = byte_stream[end_idx + 2:]

                            # Decode frame
                            frame = cv2.imdecode(np.frombuffer(jpeg_data, dtype=np.uint8), cv2.IMREAD_COLOR)
                            if frame is None:
                                continue

                            # Resize frame
                            frame = cv2.resize(frame, (640, 480))
                            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

                            # Perform YOLO object detection
                            results = yolo_model(rgb_frame, conf=0.5, device=device)
                            detections = results[0].boxes.data.cpu().numpy() if results else []

                            # Annotate frame
                            for detection in detections:
                                x1, y1, x2, y2, confidence, class_id = detection
                                class_id = int(class_id)
                                label = class_names[class_id] if class_id < len(class_names) else "Unknown"

                                cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                                label_text = f"{label} ({confidence:.2f})"
                                cv2.putText(frame, label_text, (int(x1), int(y1) - 10),
                                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

                            # Encode frame to JPEG
                            ret, jpeg_frame = cv2.imencode('.jpg', frame)
                            if ret:
                                await self.send(bytes_data=jpeg_frame.tobytes())

        except Exception as e:
            print(f"Error fetching video stream: {e}")
            await self.close()
