from django.contrib.auth import login, logout, authenticate
from collection.models import *
from collection.serializers import *
from django.contrib.auth.models import User
from django.db.models import Q, Count, Sum
from collection.permissions import IsOwnerOrReadOnly


from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


@api_view(['GET'])
def search_view(request):
    query = request.GET.get('query', '')
    query = query.strip()
    if query == '':
        return Response({
            'success': False,
            'error': 'Bad params: Empty query'
        }, status.HTTP_400_BAD_REQUEST)

    MAX_LIMIT = 4

    # Qs help construct OR sql statement.
    # More about it: https://docs.djangoproject.com/en/3.0/topics/db/queries/#complex-lookups-with-q-objects

    if query[0] == "%":
        tags = Tag.objects.filter(name__icontains=query[1:])[:MAX_LIMIT]
        result = {
            'tags': TagSerializer(tags, many=True).data,
        }
    elif query[0] == ":":
        colls = Collection.objects.filter(
            Q(Q(name__icontains=query)
              | Q(desc__icontains=query[1:])))[:MAX_LIMIT]
        result = {
            'collections': ShortCollectionSerialiser(colls, many=True).data,
        }
    elif query[0] == ">":
        snips = Snippet.objects.filter(
            Q(Q(title__icontains=query)
              | Q(link__icontains=query[1:])))[:MAX_LIMIT]
        result = {
            'snippets': SnippetSerializer(snips, many=True).data,
        }
    elif query[0] == "@":
        users = User.objects.filter(username__icontains=query[1:])[:MAX_LIMIT]
        result = {
            'users': ShortUserSerializer(users, many=True).data,
        }
    else:
        colls = Collection.objects.filter(
            Q(Q(name__icontains=query) | Q(desc__icontains=query)))[:MAX_LIMIT]
        snips = Snippet.objects.filter(
            Q(Q(title__icontains=query)
              | Q(link__icontains=query)))[:MAX_LIMIT]
        tags = Tag.objects.filter(name__icontains=query)[:MAX_LIMIT]

        result = {
            'collections': ShortCollectionSerialiser(colls, many=True).data,
            'snippets': SnippetSerializer(snips, many=True).data,
            'tags': TagSerializer(tags, many=True).data,
        }

    return Response({
        'success': True,
        'result': result,
    }, status.HTTP_200_OK)


@api_view(['POST'])
def login_view(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({
            'success': True,
            'token': f"Token {token}"
        }, status.HTTP_200_OK)
    else:
        return Response({'success': False}, status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'success': True}, status.HTTP_200_OK)
