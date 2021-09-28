from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
import time
import json

from django.views.decorators.csrf import csrf_exempt
from .models import *

# Create your views here.


def index(request):
    return render(request, "tasktracker/index.html", {

    })


def task(request, task_id):
    if request.method == "GET":
        task = Task.objects.get(pk=task_id)
        return JsonResponse(task.serialize(), safe=False)
    elif request.method == "PUT":
        data = json.loads(request.body)
        t = Task.objects.get(pk=task_id)
        t.reminder = data["reminder"]
        t.save()
        return HttpResponse(status=204)
    elif request.method == "DELETE":
        t = Task.objects.get(pk=task_id)
        t.delete()
        return HttpResponseRedirect(reverse("index"))


def tasks(request):

    tasks = Task.objects.all()
    tasks = tasks.order_by("time").all()
    return JsonResponse([task.serialize() for task in tasks], safe=False)


@csrf_exempt
def addTask(request):

    data = json.loads(request.body)
    if data["reminder"] == "false":
        data["reminder"] = False
    elif data["reminder"] == "true":
        data["reminder"] = True
    t = Task(task=data["task"], time=data["targetTime"],
             reminder=data["reminder"])
    t.save()

    return HttpResponseRedirect(reverse("index"))


@csrf_exempt
def editTask(request, task_id):
    data = json.loads(request.body)
    t = Task.objects.get(pk=task_id)
    t.reminder = data["reminder"]
    t.save()
    return HttpResponseRedirect(reverse("index"))
