from django.shortcuts import render

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializer import UserSerializer, CustomTokenObtainPairSerializer


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

            res = Response()

            res.data = {'success':True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,  # Change to True in production with HTTPS
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=False,  # Change to True in production with HTTPS
                samesite='None',
                path='/'
            )

            return res
        else:
            return Response({'success':False})
    except Exception as e:
            print(e)
            return Response({'success':False})

        
@api_view(['POST'])
def refresh_token_view(request):
    try:
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            new_access_token = RefreshToken(refresh_token).access_token
            res = Response()
            res.data = {'success': True}

            res.set_cookie(
                key='access_token',
                value=new_access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/'
            )
            return res
        else:
            return Response({'success': False})
    except Exception as e:
        print(e)
        return Response({'success': False})


@api_view(['GET'])
def getUser(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many = True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAuthUser(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many = True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        res = Response()
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        res.data = {'success':True}

        return res

    except Exception as e:
        print(e)
        return Response({'success':False})
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_loggedin_view(request):
    return Response({'success':True})

