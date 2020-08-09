from collection.models import *
from collection.serializers import *
from collection.permissions import IsOwnerOrReadOnly

from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response


class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly
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
