from django.shortcuts import render

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializer import UserSerializer, CustomTokenObtainPairSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['POST'])
def login_view(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            serializer = CustomTokenObtainPairSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data
            
            # Set tokens in HttpOnly cookies
            access_token = tokens['access']
            refresh_token = tokens['refresh']

            return Response({
                'success' : True,
                'access_token' : access_token,
                'refresh_token' : refresh_token,
            })

        else:
            return Response({'success':False})
    except Exception as e:
            print(e)
            return Response({'success':False})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()  # Adds the token to the blacklist
        return Response({'success':True})
    except Exception as e:
        print(e)
        return Response({'success':False})


