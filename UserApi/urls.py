from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import login_view,logout_view,is_authenticated


urlpatterns = [
    path('login/', login_view, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', logout_view, name='logout'),
    path('is_authenticated/',is_authenticated,name='is_authenticated')
]