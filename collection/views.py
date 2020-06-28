from .models import *
from .serializers import *

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet


class CollectionView(ModelViewSet):
    serializer_class = CollectionSerializer
    queryset = Collection.objects.all()
