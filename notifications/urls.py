from django.urls import path

from notifications.views import *

urlpatterns = [
    path('notifications/unread', UnreadNotificationsView.as_view()),
]
