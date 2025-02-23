from django.urls import path
from .views import getObjectDetection,getStream,object_detection_sse



urlpatterns = [
    path('streaming/', getObjectDetection, name='objectDetection'),
    path('streamURL/', getStream, name='getStreamURL'),
    path("events/", object_detection_sse, name="object_detection_sse"),
]