import { useEffect, useState } from "react";
import type { Categoria } from "@/types/categoria";

export default function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchCategorias() {
      const response = await fetch("/api/categorias");
      const data = await response.json();
      setCategorias(data.data);
      setLoading(false);
    }
    fetchCategorias();
  }, []);

  return { categorias, loading };
}
