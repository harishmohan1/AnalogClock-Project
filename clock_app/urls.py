# urls.py

from django.urls import path
from . import views

urlpatterns = [
     path('', views.world_map, name='worldmap'),
    path('get_local_time/', views.get_local_time, name='get_local_time'),
]

