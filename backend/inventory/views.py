from .models import SqlHost, SqlGroup, SqlSecret
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import SqlHostSerializer, SqlGroupSerializer, SqlSecretSerializer
#from knox.auth import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
#from knox.views import LoginView as KnoxLoginView
from rest_framework.authentication import BasicAuthentication

#class LoginView(KnoxLoginView):
#    authentication_classes = [BasicAuthentication]



class SqlHostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows hosts to be viewed or edited.
    """
    #authentication_classes = (TokenAuthentication,)
    #authentication_classes = (BasicAuthentication,)
    authentication_classes = (JWTAuthentication,)
    queryset = SqlHost.objects.all()
    serializer_class = SqlHostSerializer
    permission_classes = [permissions.IsAuthenticated]


class SqlGroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    #authentication_classes = (TokenAuthentication,)
    #authentication_classes = (BasicAuthentication,)
    authentication_classes = (JWTAuthentication,)
    queryset = SqlGroup.objects.all()
    serializer_class = SqlGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
class SqlSecretViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    #authentication_classes = (TokenAuthentication,)
    #authentication_classes = (BasicAuthentication,) 
    authentication_classes = (JWTAuthentication,)
    queryset = SqlSecret.objects.all()
    serializer_class = SqlSecretSerializer
    permission_classes = [permissions.IsAuthenticated]