from django.contrib import admin
from django.urls import path
from collection.views import *
from django.views.decorators.csrf import csrf_exempt


'''
GET      /api/collections
PUT      /api/collections
GET      /api/collection/<id>
POST     /api/collection/<id>
DELETE   /api/collection/<id>
'''
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('collections', CollectionSingleView.as_view(
        {'get': 'list', 'put': 'create'})),
    path('collection/<int:pk>', CollectionSingleView.as_view(
        {'get': 'retrieve', 'delete': 'destroy', 'post': 'partial_update'})),
    path('login', login_view),
    path('logout', logout_view),
]
