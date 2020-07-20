from django.contrib.auth import login, logout, authenticate
import json
from collection.models import Snippet, Collection
from collection.serializers import SnippetSerializer, UserSerializer, CollectionSerializer
from django.contrib.auth.models import User
from collection.permissions import IsOwnerOrReadOnly
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


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


class HeartSnippetView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, snip_id):
        try:
            snip = Snippet.objects.get(id=snip_id)
        except:
            return Response({'success': False}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        liked = False
        if user not in snip.hearts.all():
            liked = True
            snip.hearts.add(user)
        else:
            liked = False
            snip.hearts.remove(user)
        snip.save()

        return Response(
            {'success': True, 'liked': liked},
            status=status.HTTP_200_OK
        )


class FollowCollectionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, coll_id):
        try:
            coll = Collection.objects.get(id=coll_id)
        except:
            return Response({'success': False}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        followed = False
        if user not in coll.followers.all():
            followed = True
            coll.followers.add(user)
        else:
            followed = False
            coll.followers.remove(user)
        coll.save()

        return Response(
            {'success': True, 'followed': followed},
            status=status.HTTP_200_OK
        )


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
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = authenticate(username=username, password=password)
    if user is not None:
        print(f'Username: {username} Password: {password}')
        login(request, user)
        return Response({'success': True, 'token': f"Token {token}"}, status.HTTP_200_OK)
    else:
        return Response({'success': False}, status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'success': True}, status.HTTP_200_OK)
