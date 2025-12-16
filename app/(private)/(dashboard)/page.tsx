"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
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
  const [qtdReceitas, setQtdReceitas] = useState<number>(0);
  const [qtdDespesas, setQtdDespesas] = useState<number>(0);
  const [somaReceitas, setSomaReceitas] = useState<number>(0);
  const [somaDespesas, setSomaDespesas] = useState<number>(0);
  const [ultimaTransacao, setUltimaTransacao] = useState<Transacao>({
    titulo: "",
    valor: 0,
    tipo: "",
  });
  const [ultimasTransacoes, setUltimasTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  // função para buscar os dados na API
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        console.log();
        setQtdReceitas(data.data.resumo.quantidadeReceitas);
        setQtdDespesas(data.data.resumo.quantidadeDespesas);
        setSomaReceitas(data.data.resumo.totalReceitas);
        setSomaDespesas(data.data.resumo.totalDespesas);
        setUltimaTransacao(data.data.ultimaTransacao);
        setUltimasTransacoes(data.data.ultimasTransacoes);
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
        <CardDash title="Qtd Receitas" value={qtdReceitas} />
        <CardDash title="Qtd Despesas" value={qtdDespesas} />
        <CardDash title="Total Receitas" value={somaReceitas} />
        <CardDash title="Total Despesas" value={somaDespesas} />
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
