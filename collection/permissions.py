from rest_framework import permissions
from collection.models import Collection


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


def is_user_allowed(user, obj):
    if obj.permission == 'all' and obj.visibility == 'public':
        return True

    user_in = len(obj.allowed_users.filter(username=user.username))
    if obj.permission == 'selective' and user_in:
        return True

    return False


class CollectionPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.owner == request.user:
            return True

        print(request.method)
        if request.method in permissions.SAFE_METHODS and (
            obj.visibility == 'public' or is_user_allowed(request.user, obj)
        ):
            return True

        return False


class TagPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        coll = view.kwargs.get('coll_id', '-1')

        try:
            collection = Collection.objects.get(id=coll)
            print(collection.owner, request.user)
            if collection.owner == request.user:
                print(f"im {request.user} and im the owner")
                return True
        except:
            return False


class SnippetPermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        print('in has_permission')
        if request.method != 'POST':
            return True

        coll_id = request.POST.get('collection', '-1')

        try:
            collection = Collection.objects.get(id=coll_id)
            if collection.owner == request.user:
                print(f"im {request.user} and im the owner")
                return True

            if is_user_allowed(request.user, collection):
                print(f"im {request.user} and im  in the list")
                return True
        except:
            return False

    def has_object_permission(self, request, view, obj):
        if obj.collection.owner == request.user:
            print(f"im {request.user} and im the owner")
            return True

        if request.METHOD in ['PUT', 'DELETE'] and obj.owner != request.user:
            print(f"I'm not the owner of this object")
            return False

        if is_user_allowed(request.user, obj.collection):
            # if (obj.owner == request.user):
            print(f"im {request.user} and im  in the list")
            return True

        if request.method in permissions.SAFE_METHODS and obj.collection.visibility == 'public':
            print(f"im {request.user} and its public")
            return True

        print(f"im {request.user} and i dont have access")
        return False
