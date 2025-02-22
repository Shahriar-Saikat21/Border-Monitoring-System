from django.urls import path
from .views import getObjectDetection,getStream



urlpatterns = [
    path('streaming/', getObjectDetection, name='objectDetection'),
    path('streamURL/', getStream, name='getStreamURL'),
]