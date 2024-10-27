from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.exceptions import AuthenticationFailed

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try to get the token from the cookies first
        access_token = request.COOKIES.get('access_token')
        
        if access_token is None:
            return None

        try:
            validated_token = self.get_validated_token(access_token)
            user = self.get_user(validated_token)
            return (user, validated_token)
        except InvalidToken:
            raise AuthenticationFailed('Invalid access token')