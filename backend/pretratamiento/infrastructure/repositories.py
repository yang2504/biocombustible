from typing import Optional
from pretratamiento.domain.entity import Pretratamiento
from pretratamiento.domain.repository import PretratamientoRepository
from pretratamiento.models import PretratamientoModel

class MySQLPretratamientoRepository(PretratamientoRepository):
    def get_all(self) -> list[Pretratamiento]:
        modelos = PretratamientoModel.objects.all()
        return [self._to_entity(m) for m in modelos]

    def get_by_id(self, pretratamiento_id: int) -> Optional[Pretratamiento]:
        try:
            modelo = PretratamientoModel.objects.get(idpretratamiento=pretratamiento_id)
            return self._to_entity(modelo)
        except PretratamientoModel.DoesNotExist:
            return None

    def create(self, pretratamiento: Pretratamiento) -> Pretratamiento:
        modelo = PretratamientoModel(
            idRecepcion=pretratamiento.id_recepcion,
            fechaInicio=pretratamiento.fecha_inicio,
            metodoFiltrado=pretratamiento.metodo_filtrado,
            tiempoSedimentacion=pretratamiento.tiempo_sedimentacion,
            porcentajeImpurezas=pretratamiento.porcentaje_impurezas,
            temperaturaProceso=pretratamiento.temperatura_proceso,
            observaciones=pretratamiento.observaciones
        )
        modelo.save()
        return self._to_entity(modelo)

    def update(self, pretratamiento: Pretratamiento) -> Pretratamiento:
        try:
            modelo = PretratamientoModel.objects.get(idpretratamiento=pretratamiento.id)
            modelo.idRecepcion = pretratamiento.id_recepcion
            modelo.fechaInicio = pretratamiento.fecha_inicio
            modelo.metodoFiltrado = pretratamiento.metodo_filtrado
            modelo.tiempoSedimentacion = pretratamiento.tiempo_sedimentacion
            modelo.porcentajeImpurezas = pretratamiento.porcentaje_impurezas
            modelo.temperaturaProceso = pretratamiento.temperatura_proceso
            modelo.observaciones = pretratamiento.observaciones
            modelo.save()
            return self._to_entity(modelo)
        except PretratamientoModel.DoesNotExist:
            raise Exception("Pretratamiento no encontrado")

    def delete(self, pretratamiento_id: int) -> bool:
        try:
            modelo = PretratamientoModel.objects.get(idpretratamiento=pretratamiento_id)
            modelo.delete()
            return True
        except PretratamientoModel.DoesNotExist:
            return False

    def _to_entity(self, modelo: PretratamientoModel) -> Pretratamiento:
        return Pretratamiento(
            id=modelo.idpretratamiento,
            id_recepcion=modelo.idRecepcion,
            fecha_inicio=modelo.fechaInicio,
            metodo_filtrado=modelo.metodoFiltrado,
            tiempo_sedimentacion=modelo.tiempoSedimentacion,
            porcentaje_impurezas=modelo.porcentajeImpurezas,
            temperatura_proceso=modelo.temperaturaProceso,
            observaciones=modelo.observaciones
        )
