from django.contrib.auth import login, logout, authenticate
import json
from collection.models import Snippet, Collection, Tag
from collection.serializers import *
from django.contrib.auth.models import User
from django.db.models import Q, Count, Sum
from collection.permissions import IsOwnerOrReadOnly
from datetime import datetime, timedelta
from collection.api import get_images_for_tag

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework import generics
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
    serializer_class = CollectionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

    def get_queryset(self):
        return Collection.objects.all()

    def perform_create(self, serializer):
        s = serializer.save(owner=self.request.user)
        print(s)


class PopularCollectionViewset(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ShortCollectionSerialiser

    def get_queryset(self):
        colls = Collection.objects.all() \
            .filter(timestamp__gte=datetime.now() - timedelta(days=30)) \
            .annotate(foll_count=Count('followers')) \
            .order_by('-foll_count', '-timestamp')

        limit = int(self.request.GET.get('limit', '0'))
        if limit and limit > 0:
            colls = colls[:limit]
        return colls


class FollowedCollectionViewset(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticated]
    serializer_class = ShortCollectionSerialiser

    def get_queryset(self):
        user = self.request.user
        colls = user.followed_collections.all().order_by('-timestamp')

        limit = int(self.request.GET.get('limit', '0'))
        if limit and limit > 0:
            colls = colls[:limit]
        return colls


class CollectionsForTagViewset(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ShortCollectionSerialiser

    def get_queryset(self):
        tag_name = self.kwargs.get('tag_name')
        return Collection.objects.filter(tags__name=tag_name)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'username'
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


class AllTagsView(generics.ListAPIView):
    queryset = Tag.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TagSerializer


class TagsToCollection(APIView):
    permission_classes = [IsOwnerOrReadOnly]

    def post(self, request, coll_id):
        tags = request.POST.get('tags', '')
        tags = tags.split(',')

        try:
            collection = Collection.objects.get(id=coll_id)
        except:
            return Response({'error': 'Collection Not Found'}, status.HTTP_404_NOT_FOUND)

        collection.tags.all().delete()

        for tag_name in tags:
            try:
                tag = Tag.objects.get(name=tag_name)
            except:
                print(f"Creating new tag {tag_name}")
                tag = Tag(name=tag_name)
                tag.image_urls = get_images_for_tag(tag_name)
                tag.save()
            collection.tags.add(tag)

        return Response({'success': True}, status.HTTP_200_OK)


@api_view(['GET'])
def search_view(request):
    query = request.GET.get('query', '')
    query = query.strip()
    if query == '':
        return Response({'success': False, 'error': 'Bad params: Empty query'}, status.HTTP_400_BAD_REQUEST)

    MAX_LIMIT = 4

    # Qs help construct OR sql statement.
    # More about it: https://docs.djangoproject.com/en/3.0/topics/db/queries/#complex-lookups-with-q-objects
    colls = Collection.objects.filter(Q(
        Q(name__icontains=query) | Q(desc__icontains=query)
    ))[:MAX_LIMIT]
    snips = Snippet.objects.filter(Q(
        Q(title__icontains=query) | Q(link__icontains=query)
    ))[:MAX_LIMIT]
    tags = Tag.objects.filter(name__icontains=query)[:MAX_LIMIT]

    result = {
        'collections': ShortCollectionSerialiser(colls, many=True).data,
        'snippets': SnippetSerializer(snips, many=True).data,
        'tags': TagSerializer(tags, many=True).data,
    }

    print(result)

    return Response({
        'success': True,
        'result': result,
    }, status.HTTP_200_OK)


@api_view(['GET'])
def is_logged_in_view(request):
    if request.user.is_authenticated:
        return Response({'success': True, 'user': request.user.username}, status.HTTP_200_OK)
    else:
        return Response({'success': False}, status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def login_view(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'success': True, 'token': f"Token {token}"}, status.HTTP_200_OK)
    else:
        return Response({'success': False}, status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'success': True}, status.HTTP_200_OK)


class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
