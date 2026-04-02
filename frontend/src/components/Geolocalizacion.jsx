import { useState } from "react";
import "./Geolocalizacion.css";

function Geolocalizacion() {
  const [direccion, setDireccion] = useState("");
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const buscar = async () => {
    if (!direccion.trim()) return;

    setCargando(true);
    setError(null);
    setResultado(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/geolocalizacion/?direccion=${encodeURIComponent(direccion)}`
      );
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.mensaje || "No se encontraron resultados.");
      } else {
        setResultado(data);
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") buscar();
  };

  return (
    <div className="geo-container">
      <div className="geo-card">
        <div className="geo-header">
          <div className="geo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h1>Geolocalización</h1>
          <p className="geo-subtitle">Busca coordenadas de cualquier dirección</p>
        </div>

        <div className="geo-search">
          <div className="geo-input-wrapper">
            <svg className="geo-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              id="direccion-input"
              type="text"
              placeholder="Escribe una dirección..."
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={cargando}
            />
          </div>
          <button id="buscar-btn" onClick={buscar} disabled={cargando || !direccion.trim()}>
            {cargando ? (
              <span className="geo-spinner"></span>
            ) : (
              "Buscar"
            )}
          </button>
        </div>

        {cargando && (
          <div className="geo-loading">
            <div className="geo-pulse"></div>
            <span>Buscando...</span>
          </div>
        )}

        {error && (
          <div className="geo-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {resultado && (
          <div className="geo-result">
            <div className="geo-result-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Resultado encontrado</span>
            </div>

            <div className="geo-result-body">
              <div className="geo-result-item geo-address">
                <label>Dirección</label>
                <span>{resultado.direccion_formateada}</span>
              </div>
              <div className="geo-coords">
                <div className="geo-result-item">
                  <label>Latitud</label>
                  <span className="geo-coord-value">{resultado.lat}</span>
                </div>
                <div className="geo-result-item">
                  <label>Longitud</label>
                  <span className="geo-coord-value">{resultado.lng}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Geolocalizacion;
