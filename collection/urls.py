from django.urls import path, include
from collection import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'snippets', views.SnippetViewSet)
router.register(r'collections', views.CollectionViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login', views.login_view),
    path('logout', views.logout_view),
    path('isLoggedIn', views.is_logged_in_view),
]
