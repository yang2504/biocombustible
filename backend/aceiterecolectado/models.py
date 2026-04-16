from django.db import models

class AceiteRecolectadoModel(models.Model):
    idRecoleccion = models.AutoField(primary_key=True)
    tipoDeAceite = models.CharField(max_length=50, null=True, blank=True)
    fechaAlmacen = models.DateField(null=True, blank=True)
    cantidadAceite = models.FloatField(null=True, blank=True)
    observaciones = models.CharField(max_length=45, null=True, blank=True)

    class Meta:
        db_table = "aceiterecolectado"
        managed = False
