import random
import string
from django.db import models

def generate_unique_code():
    length  = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    tournament = models.CharField(max_length=50, unique=False)
    max_players = models.IntegerField(null=False, default=2)
    votes_to_skip = models.IntegerField(null=False, default=1)
    
    started = models.BooleanField(null=False, default=False)