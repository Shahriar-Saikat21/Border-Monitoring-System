from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests
from rest_framework import status
from django.http import StreamingHttpResponse

@api_view(['GET'])
def getObjectDetection(request):
    flask_video_url = 'http://127.0.0.1:5000/video_feed'  # Flask video endpoint

    try:
        # Forward the video stream from Flask to React
        flask_response = requests.get(flask_video_url, stream=True)
        return StreamingHttpResponse(flask_response.iter_content(chunk_size=1024),
                                     content_type='multipart/x-mixed-replace; boundary=frame')
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response()
