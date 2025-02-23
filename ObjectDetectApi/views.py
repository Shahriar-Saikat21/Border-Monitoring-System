from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests
from rest_framework import status
from django.http import StreamingHttpResponse
import cv2
import json
import time
from ultralytics import YOLO  

# Load YOLO model
model = YOLO("model/best.pt")  

# Store detected objects with a timestamp
detected_objects = set()  # Use a set to avoid duplicates
last_detection_time = time.time()  # Track last detection

def generate_frames():
    global detected_objects, last_detection_time
    flask_video_url = "http://127.0.0.1:5000/video_feed"
    cap = cv2.VideoCapture(flask_video_url)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Convert frame to RGB for YOLO processing
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Run object detection
        results = model(frame_rgb)

        # Reset detected objects for this frame
        new_detections = set()

        # Process detected objects
        for box in results[0].boxes.data:
            x1, y1, x2, y2, conf, cls = map(int, box[:6])
            label = f"Object {cls} ({conf:.2f})"
            new_detections.add(label)

            # Draw bounding box & label
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Update detected objects list
        if new_detections:
            detected_objects = new_detections
            last_detection_time = time.time()  # Update detection time
        elif time.time() - last_detection_time > 1:  # Clear after 1 sec of no detection
            detected_objects.clear()

        # Encode frame as JPEG
        _, jpeg = cv2.imencode(".jpg", frame)
        frame_bytes = jpeg.tobytes()

        # Yield frame as part of the stream
        yield (b"--frame\r\n"
               b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")

    cap.release()

@api_view(['GET'])
def getObjectDetection(request):
    """ Stream video with object detection """
    try:
        return StreamingHttpResponse(generate_frames(), content_type="multipart/x-mixed-replace; boundary=frame")
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getStream(request):
    """ Return video stream URL """
    try:
        return Response({'success': True, 'URL': 'http://127.0.0.1:8000/stream/streaming/'})
    except:
        return Response({'success': False})

def object_detection_sse(request):
    """ Send real-time detection notifications via SSE """
    def event_stream():
        last_alert = None  # Track last alert message
        while True:
            time.sleep(0.5)  # Faster update rate (0.5 sec)

            if detected_objects:
                alert_msg = f"Detected: {', '.join(detected_objects)}"
                if alert_msg != last_alert:  # Only send if new detection occurs
                    last_alert = alert_msg
                    data = json.dumps({"message": alert_msg})
                    yield f"data: {data}\n\n"
            else:
                if last_alert is not None:  # Send empty alert to stop buzzer
                    last_alert = None
                    data = json.dumps({"message": ""})
                    yield f"data: {data}\n\n"

    return StreamingHttpResponse(event_stream(), content_type="text/event-stream")
