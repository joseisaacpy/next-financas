"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardDash from "@/components/dash/CardDash";
import CardUltimoLog from "@/components/dash/CardUltimoLog";
import TableLog from "@/components/dash/TableLog";
import type { TipoTransacao } from "@/types/tipoTransacao";

type Transacao = {
  titulo: string;
  valor: number;
  tipo: TipoTransacao;
};

export default function Dashboard() {
  // estados para armazenar os dados
  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [ultimaTransacao, setUltimaTransacao] = useState<Transacao>({
    titulo: "",
    valor: 0,
    tipo: "",
  });
  const [ultimasTransacoes, setUltimasTransacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  // função para buscar os dados na API
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        setDespesas(data.data.despesas);
        setReceitas(data.data.receitas);
        setUltimaTransacao(data.data.ultimaTransacao);
        setUltimasTransacoes(data.data.ultimasTransacoes);
        setCategorias(data.data.categorias);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    // chama a função
    getData();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <section className="px-4 py-2 space-y-4">
      <h1 className="title-primary">Filtrar por datas</h1>
      {/* filtros de datas */}
      <div>
        <div className="flex justify-center items-center gap-2">
          <div className="form-group">
            <Label htmlFor="dataInicial">De:</Label>
            <Input id="dataInicial" type="date" />
          </div>
          <div className="form-group">
            <Label htmlFor="dataFinal">Até:</Label>
            <Input id="dataFinal" type="date" />
          </div>
        </div>
      </div>
      {/* grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <CardDash title="Receitas" value={receitas.length} />
        <CardDash title="Despesas" value={despesas.length} />
        <CardDash title="Categorias" value={categorias.length} />
        <CardUltimoLog
          title={ultimaTransacao.titulo}
          tipo={ultimaTransacao.tipo}
          value={ultimaTransacao.valor}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <TableLog dados={ultimasTransacoes} />
      </div>
    </section>
  );
}
