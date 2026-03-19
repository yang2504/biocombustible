from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.application.use_cases import LoginUserUseCase, GetUsersUseCase
from authentication.infrastructure.repositories import MySQLUserRepository

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("correoElectronico") or request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email (correoElectronico) y contraseña requeridos"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Inyección de dependencias
        repo = MySQLUserRepository()
        use_case = LoginUserUseCase(repo)
        
        user = use_case.execute(email, password)

        if not user:
            return Response(
                {"error": "Credenciales incorrectas"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Generar token JWT
        token = RefreshToken()
        token["user_id"] = user.id
        token["email"] = user.correo_electronico

        return Response({
            "access_token": str(token.access_token),
            "token_type": "bearer"
        })

class UserListView(APIView):
    def get(self, request):
        repo = MySQLUserRepository()
        use_case = GetUsersUseCase(repo)
        
        users = use_case.execute()
        
        data = []
        for user in users:
            data.append({
                "id": user.id,
                "CarnetIdentidad": user.carnet_identidad,
                "nombre": user.nombre,
                "apellido": user.apellido,
                "correoElectronico": user.correo_electronico,
                "direccion": user.direccion,
                "telefono": user.telefono,
                "fechaNacimiento": user.fecha_nacimiento,
                "rol": user.rol
            })
            
        return Response(data, status=status.HTTP_200_OK)