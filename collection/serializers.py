from rest_framework import serializers
from collection.models import *
from django.contrib.auth.models import User


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name", "image_urls"]


class SnippetSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    hearts = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Snippet
        fields = ['id', 'owner', 'title', 'timestamp',
                  'type_of', 'link', 'collection', 'hearts']


class CollectionSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    snippets = SnippetSerializer(many=True, read_only=True)
    followers = serializers.StringRelatedField(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ['id', 'owner', 'name', 'timestamp', 'followers',
                  'snippets', 'desc', 'tags']


class ShortCollectionSerialiser(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    followers = serializers.StringRelatedField(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ['id', 'name', 'desc', 'owner', 'followers', 'tags']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)
    collections = CollectionSerializer(many=True, read_only=True)

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'collections']
