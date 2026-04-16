from django.db import models

class PretratamientoModel(models.Model):
    idpretratamiento = models.AutoField(primary_key=True)
    idRecepcion = models.IntegerField(null=True, blank=True)
    fechaInicio = models.DateField(null=True, blank=True)
    metodoFiltrado = models.CharField(max_length=50, null=True, blank=True)
    tiempoSedimentacion = models.CharField(max_length=50, null=True, blank=True)
    porcentajeImpurezas = models.FloatField(null=True, blank=True)
    temperaturaProceso = models.FloatField(null=True, blank=True)
    observaciones = models.TextField(null=True, blank=True)

    class Meta:
        db_table = "pretratamiento"
        managed = False
