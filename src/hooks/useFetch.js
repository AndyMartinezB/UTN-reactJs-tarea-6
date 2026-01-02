import { useState, useEffect, useCallback } from "react";

// Recibe la URL como parámetro
export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Esta es la función que hace el trabajo
  const fetchData = useCallback (async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error en la petición");
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Se ejecuta automáticamente al inicio
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Retornamos los estados y la función para recargar manualmente
  return { data, loading, error, reload: fetchData };
};