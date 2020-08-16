from collection.models import *
from collection.serializers import *

from rest_framework import status, permissions, generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'username'
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class FollowUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, username):
        try:
            target_user = User.objects.get(username=username)
        except:
            return Response({
                'success': False,
            }, status=status.HTTP_404_NOT_FOUND)

        if request.user == target_user:
            return Response({
                'success': False,
            }, status=status.HTTP_400_BAD_REQUEST)

        followed = False
        new_user = request.user
        followers = target_user.profile.followers

        if new_user not in followers.all():
            followed = True
            followers.add(new_user)
        else:
            followed = False
            followers.remove(new_user)

        target_user.profile.save()

        return Response({
            'success': True,
            'followed': followed
        }, status=status.HTTP_200_OK)
