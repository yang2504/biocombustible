from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from authentication.models import UsuarioModel

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        """
        Attempts to find and return a user using the given validated token.
        Overrides the default method to use UsuarioModel instead of auth.User.
        """
        try:
            # We used "user_id" when creating the token in views.py
            user_id = validated_token.get("user_id")
            if not user_id:
                raise AuthenticationFailed("Token contained no recognizable user identification", code="user_id_not_found")

            user = UsuarioModel.objects.get(id=user_id)
            return user
        except UsuarioModel.DoesNotExist:
            raise AuthenticationFailed("User not found", code="user_not_found")
