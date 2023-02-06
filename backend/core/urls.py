from django.urls import path
from .views import RegisterAPIView, LoginAPIView, UserAPIView, RefreshAPIView, LogoutAPIView, PostAPIView, DeleteAPIView, PostUserAPIView, UserDetailsAPIView

urlpatterns = [
    path('register', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('user', UserAPIView.as_view()),
    path('refresh', RefreshAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('delete/<int:id>/', DeleteAPIView.as_view()),
    path('post/<int:id>', PostAPIView.as_view()),
    path('post', PostAPIView.as_view()),
    path('post/user/<int:id>', PostUserAPIView.as_view()),
    path('user/details/<int:id>', UserDetailsAPIView.as_view()),

]
