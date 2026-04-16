from django.db import models

class TipoAceite(models.Model):
    idtipoAceite = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, null=True, blank=True)

    class Meta:
        db_table = "tipoaceite"
        managed = False 

class SolicitudRecoleccionModel(models.Model):
    idsolicita = models.AutoField(primary_key=True)
    idUsuario = models.IntegerField(null=True, blank=True)  
    idTipo = models.IntegerField(null=True, blank=True)     
    cantidadLitros = models.FloatField(null=True, blank=True)
    fechaSolicitud = models.DateField(null=True, blank=True)
    horaDeRecolec = models.TimeField(null=True, blank=True)
    fechaRecolec = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=15, null=True, blank=True) 

    class Meta:
        db_table = "solicitudrecoleccion"
        managed = False  
