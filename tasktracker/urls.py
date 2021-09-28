from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("tasks/<int:task_id>", views.task, name="task"),
    path("tasks/all", views.tasks, name="tasks"),
    path("tasks", views.addTask, name="addtask")
]
