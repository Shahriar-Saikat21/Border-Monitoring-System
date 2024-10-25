from django.urls import path

from .views import CustomTokenObtainPairView,CustomTokenRefreshView,getUser,getAuthUser,logout


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('getUser/', getUser, name='get_user'),
    path('getAuthUser/', getAuthUser, name='get_auth_user'),
    path('logout/', logout, name='logout'),
]