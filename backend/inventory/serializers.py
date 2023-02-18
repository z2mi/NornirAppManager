from .models import SqlHost, SqlGroup, SqlSecret
from rest_framework import serializers

class NameField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name
    

        
#class SqlHostSerializer(serializers.HyperlinkedModelSerializer):
class SqlHostSerializer(serializers.ModelSerializer):
    #url = serializers.HyperlinkedIdentityField(view_name="sqlhost-detail")
    groups = NameField(queryset=SqlHost.objects.all(), many=True)
    secret = NameField(queryset=SqlSecret.objects.all(), many=False)
    class Meta:
        model = SqlHost
        fields = ['hostname', 'host', 'port', 'platform', 'transport', 'site', 'type', 'groups', 'secret']


#class SqlGroupSerializer(serializers.HyperlinkedModelSerializer):
class SqlGroupSerializer(serializers.ModelSerializer):
    parent_groups = NameField(queryset=SqlGroup.objects.all(), many=True)
    #url = serializers.HyperlinkedIdentityField(view_name="sqlgroup-detail")
    class Meta:
        model = SqlGroup
        fields = [ 'id', 'name' , 'parent_groups' ]
        

#class SqlSecretSerializer(serializers.HyperlinkedModelSerializer):
class SqlSecretSerializer(serializers.ModelSerializer):
    #url = serializers.HyperlinkedIdentityField(view_name="sqlgroup-detail")
    class Meta:
        model = SqlSecret
        fields = [ 'name' , 'username' ]