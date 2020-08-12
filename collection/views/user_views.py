from collection.models import *
from collection.serializers import *

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

class FollowUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        try:
            profile = Profile.objects.get(user=user_id)
        except: 
            return Response({
            'success': False,
        }, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user.username
        followed = False

        if not profile.my_followers:
            profile.my_followers = user
            followed = True
        
        else: 
            followers = profile.my_followers.split(',')

            if user not in followers:
                followers.append(user)
                followed = True
            else: 
                followers.remove(user)
                followed = False
            
            profile.my_followers = ",".join(followers)
        
        profile.save()

        return Response({
            'success': True,
            'followed': followed
        }, status=status.HTTP_200_OK)