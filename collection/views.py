from .models import *
from .serializers import *
from .permissions import *

from django.contrib.auth import login, logout, authenticate

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated


class CollectionAllView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CollectionSerializer
    queryset = Collection.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CollectionSingleView(ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = CollectionSerializer
    queryset = Collection.objects.all()


@api_view(['POST'])
def login_view(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = authenticate(username=username, password=password)
    print(f"USERNMAE:{username} PASSWORD: {password} USER: {user}")

    if user is not None:
        login(request, user)
        return Response({'success': True}, 200)
    else:
        return Response({'success': False}, 401)


@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'success': True}, 200)
