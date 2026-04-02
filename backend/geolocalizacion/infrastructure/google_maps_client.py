import requests

def llamar_google_maps(direccion):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": direccion,
        "format": "json",
        "limit": 1
    }
    headers = {"User-Agent": "mi-proyecto-universitario"}
    response = requests.get(url, params=params, headers=headers)
    data = response.json()

    if data:
        return {
            "status": "OK",
            "results": [{
                "formatted_address": data[0]["display_name"],
                "geometry": {
                    "location": {
                        "lat": float(data[0]["lat"]),
                        "lng": float(data[0]["lon"])
                    }
                }
            }]
        }
    return {"status": "ZERO_RESULTS"}