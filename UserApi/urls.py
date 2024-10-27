from django.urls import path

from .views import getUser,getAuthUser,login_view,logout_view,refresh_token_view,is_loggedin_view


urlpatterns = [
    path('login/', login_view, name='login'),
    path('token/refresh/', refresh_token_view, name='token_refresh'),
    path('getUser/', getUser, name='get_user'),
    path('getAuthUser/', getAuthUser, name='get_auth_user'),
    path('logout/', logout_view, name='logout'),
    path('is_log/', is_loggedin_view, name='is_authenticate'),
]