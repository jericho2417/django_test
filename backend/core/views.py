from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
from core.authentication import create_access_token, JWTAuthentication, create_refresh_token, decode_refresh_token

from core.models import User, Post
from .serializers import PostSerializer, UserSerializer

# Create your views here.


class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException("Password doesn't match")
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class PostAPIView(APIView):

    def get(self, request):
        post = Post.objects.all()
        serializer = PostSerializer(post, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = PostSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def put(self, request, id):
        post = Post.objects.get(pk=id)
        data = PostSerializer(instance=post, data=request.data)
        data.is_valid()
        data.save()
        return Response(data.data)


class PostUserAPIView(APIView):

    def get(self, request, id):
        post = Post.objects.get(pk=id)
        serializer = PostSerializer(post)
        return Response(serializer.data)


class DeleteAPIView(APIView):
    def delete(self, request, id):
        post = Post.objects.filter(id=id)
        post.delete()
        response = Response()
        response.data = {
            "message": "success"
        }
        return response


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()

        if user is None:
            raise exceptions.AuthenticationFailed('Invalid credentials')
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Invalid credentials')
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        response = Response()
        response.set_cookie(key='refresh_token',
                            value=refresh_token, httponly=True)
        response.data = {
            'token': access_token
        }
        return response


class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            "token": access_token
        })


class LogoutAPIView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(key='refresh_token')
        response.data = {
            "message": "success"
        }
        return response
