from django.urls import path
from authentication.views import LoginView, UserListView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("users/", UserListView.as_view(), name="user-list"),
]
