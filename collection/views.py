from django.contrib.auth import login, logout, authenticate
import json
from collection.models import Snippet, Collection
from collection.serializers import SnippetSerializer, UserSerializer, CollectionSerializer
from django.contrib.auth.models import User
from collection.permissions import IsOwnerOrReadOnly
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Need to refactor

@api_view(['GET'])
def is_logged_in_view(request):
    if request.user.is_authenticated:
        print("HELLOOO", request.user, request.user.is_authenticated)
        return Response({'success': True, 'user': request.user.username}, status.HTTP_200_OK)
    else:
        return Response({'success': False}, status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def login_view(request):
    json_body = json.loads(request.body.decode('utf-8'))
    username = json_body.get('username', '')
    password = json_body.get('password', '')
    user = authenticate(username=username, password=password)
    print(f'Username: {username} Password: {password}')
    if user is not None:
        print("USER", user)
        login(request, user)
        return Response({'success': True, 'user': username}, status.HTTP_200_OK)
    else:
        return Response({'success': False}, status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'success': True}, status.HTTP_200_OK)
