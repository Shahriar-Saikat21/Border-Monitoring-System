from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests
from rest_framework import status
from django.http import StreamingHttpResponse
import cv2
import numpy as np
from ultralytics import YOLO  # Import YOLO class

# Load custom-trained YOLO model from "model/best.pt"
model = YOLO("model/best.pt")  

def generate_frames():
    flask_video_url = "http://127.0.0.1:5000/video_feed"  # Flask video source
    cap = cv2.VideoCapture(flask_video_url)  # Capture video stream

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        # Convert frame to YOLO format (BGR to RGB)
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Perform object detection
        results = model(frame_rgb)  # Runs YOLO model

        # Draw bounding boxes
        for box in results[0].boxes.data:  # Extract bounding boxes
            x1, y1, x2, y2, conf, cls = map(int, box[:6])
            label = f"Object {cls} ({conf:.2f})"
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Encode frame as JPEG
        _, jpeg = cv2.imencode(".jpg", frame)
        frame_bytes = jpeg.tobytes()

        # Yield the frame as part of a multipart response
        yield (b"--frame\r\n"
               b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")

    cap.release()

@api_view(['GET'])
def getObjectDetection(request):
    try:
        return StreamingHttpResponse(generate_frames(), content_type="multipart/x-mixed-replace; boundary=frame")
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getStream(request):
    try:
        return Response({'success':True, 'URL':'http://127.0.0.1:8000/stream/streaming/'})
    except:
        return Response({'success':False})
