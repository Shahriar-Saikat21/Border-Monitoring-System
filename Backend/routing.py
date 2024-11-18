from django.urls import path
from ObjectDetectApi.consumers import VideoStreamConsumer

websocket_urlpatterns = [
    path('ws/video-stream/', VideoStreamConsumer.as_asgi()),
]