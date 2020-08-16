from collection.models import *
from collection.serializers import *
from collection.permissions import *

from rest_framework import viewsets, status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .viewset import ModelNoListViewset


class SnippetViewSet(ModelNoListViewset):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, SnippetPermissions
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class HeartSnippetView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, snip_id):
        try:
            snip = Snippet.objects.get(id=snip_id)
        except:
            return Response({'success': False},
                            status=status.HTTP_404_NOT_FOUND)

        user = request.user
        liked = False
        if user not in snip.hearts.all():
            liked = True
            snip.hearts.add(user)
        else:
            liked = False
            snip.hearts.remove(user)
        snip.save()

        return Response({
            'success': True,
            'liked': liked
        },
            status=status.HTTP_200_OK)


class UpvoteCommentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)
        except:
            return Response({'success': False},
                            status=status.HTTP_404_NOT_FOUND)

        user = request.user
        upvoted = False

        if user not in comment.upvotes.all():
            upvoted = True
            comment.upvotes.add(user)
        else:
            upvoted = False
            comment.upvotes.remove(user)
        comment.save()

        return Response({
            'success': True,
            'upvoted': upvoted
        }, status=status.HTTP_200_OK)


class CommentViewSet(ModelNoListViewset):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly
    ]

    def perform_create(self, serializer):
        s = serializer.save(owner=self.request.user)
        print(s)


class CollectionsForTagViewset(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ShortCollectionSerialiser

    def get_queryset(self):
        tag_name = self.kwargs.get('tag_name')
        return Collection.objects.filter(tags__name=tag_name)


class SnippetCommentListView(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer

    def get_queryset(self):
        snip_id = self.kwargs.get('snip_id')
        return Comment.objects.filter(snippet=snip_id)
