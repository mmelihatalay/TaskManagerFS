from django.db import models

# Create your models here.


class Task(models.Model):
    task = models.CharField(max_length=128, blank=False)
    time = models.DateTimeField()
    timeStamp = models.DateTimeField(auto_now_add=True)
    reminder = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.task[0:5]} - {self.reminder}"

    def serialize(self):
        return {
            "id": self.id,
            "task": self.task,
            "targetTime": self.time.strftime("%b %d %Y, %I:%M %p"),
            "timeStamp": self.timeStamp.strftime("%b %d %Y, %I:%M %p"),
            "reminder": self.reminder
        }
