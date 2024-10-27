from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import getUser,getAuthUser,login_view,logout_view


urlpatterns = [
    path('login/', login_view, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('getUser/', getUser, name='get_user'),
    path('getAuthUser/', getAuthUser, name='get_auth_user'),
    path('logout/', logout_view, name='logout'),
]