from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterAPIView (APIView):
    def post(self, request):
        return Response(request.data)