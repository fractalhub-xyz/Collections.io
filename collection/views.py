from .models import *
from .serializers import *

from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def all_collection_view(request):
    all_colls = Collection.objects.all()
    coll_serialiser = CollectionSerializer(all_colls, many=True)
    data = coll_serialiser.data
    return Response(data)


@api_view(['POST'])
def create_collection_view(request):
    coll = CollectionSerializer(data=request.data)
    if coll.is_valid():
        coll.save()
        return Response(coll.data, status=201)
    return Response(coll.errors, status=400)
