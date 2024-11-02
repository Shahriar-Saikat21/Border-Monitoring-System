from django.urls import path
from .views import getObjectDetection


urlpatterns = [
    path('streaming/', getObjectDetection, name='objectDetection'),

]