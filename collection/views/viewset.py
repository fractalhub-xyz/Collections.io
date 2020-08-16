from rest_framework import viewsets, generics, status
from rest_framework.response import Response


class ModelNoListViewset(viewsets.ModelViewSet):
    def list(self, request):
        if request.user.is_superuser:
            return super(ModelNoListViewset, self).list(request)

        return Response({}, status=status.HTTP_404_NOT_FOUND)
