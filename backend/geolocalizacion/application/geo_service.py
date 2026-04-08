from geolocalizacion.infrastructure.google_maps_client import llamar_google_maps


class GeoService:
    def obtener_coordenadas(self, direccion: str) -> dict:
        data = llamar_google_maps(direccion)

        if data.get("status") != "OK" or not data.get("results"):
            return {
                "error": True,
                "mensaje": f"No se encontraron resultados para '{direccion}'",
                "status": data.get("status", "UNKNOWN"),
            }

        resultado = data["results"][0]
        ubicacion = resultado["geometry"]["location"]

        return {
            "error": False,
            "lat": ubicacion["lat"],
            "lng": ubicacion["lng"],
            "direccion_formateada": resultado["formatted_address"],
        }
