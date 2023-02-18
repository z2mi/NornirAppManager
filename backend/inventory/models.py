from django.db import models

# Create your models here.
platforms = [
    "cisco_ios",
    "cisco_nxos",
    "juniper_junos",
    "juniper_screenos",
]

transports= [
    "telnet",
    "ssh",
    "http",
    "https",
]

PLATFORM_CHOICES = [
    ("IOS", "cisco_ios"),
    ("ASA", "cisco_asa"),
    ("NXOS", "cisco_nxos"),
    ("JUNOS", "juniper_junos"),
    ("SCREENOS", "juniper_screenos"),
]

TRANSPORT_CHOICES= [
    ("TELNET", "telnet"),
    ("SSH", "ssh"),
    ("HTTP", "http"),
    ("HTTPS", "https"),
]

class SqlSecret(models.Model):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    enable = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class SqlGroup(models.Model):
    name = models.CharField(max_length=255)
    parent_groups = models.ManyToManyField('SqlGroup', blank=True)
    
    def __str__(self):
        return self.name
    

class SqlHost(models.Model):
    hostname = models.CharField(max_length=255)
    host = models.CharField(max_length=255)
    port = models.PositiveIntegerField(default=22)
    platform = models.CharField(choices=PLATFORM_CHOICES, max_length=30, default="IOS")
    transport = models.CharField(choices=TRANSPORT_CHOICES, max_length=10, default="SSH")
    site = models.CharField(max_length=255, blank=True)
    type = models.CharField(max_length=255, blank=True)
    groups = models.ManyToManyField(SqlGroup, blank=True)
    secret = models.ForeignKey(SqlSecret, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return "{}".format(self.hostname, self.host)


