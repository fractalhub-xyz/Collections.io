from collection.models import *
from collection.serializers import *
from collection.permissions import IsOwnerOrReadOnly
from django.db.models import Q, Count, Sum
from datetime import datetime, timedelta

from rest_framework import viewsets, generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response


class CollectionViewSet(viewsets.ModelViewSet):
    serializer_class = CollectionSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly
    ]

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


class FollowCollectionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, coll_id):
        try:
            coll = Collection.objects.get(id=coll_id)
        except:
            return Response({'success': False},
                            status=status.HTTP_404_NOT_FOUND)

        user = request.user
        followed = False
        if user not in coll.followers.all():
            followed = True
            coll.followers.add(user)
        else:
            followed = False
            coll.followers.remove(user)
        coll.save()

        return Response({
            'success': True,
            'followed': followed
        }, status=status.HTTP_200_OK)
