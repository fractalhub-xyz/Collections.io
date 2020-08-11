from django.contrib import admin
from collection.models import *

admin.site.register(Snippet)
admin.site.register(Collection)
admin.site.register(Tag)
admin.site.register(Comment)
