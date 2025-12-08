"use client";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { LinhaTabela } from "@/types/linha";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function RowTable({
  id,
  titulo,
  descricao,
  valor,
  tipo,
  categoria,
  criadoEm,
}: LinhaTabela) {
  // cria instancia do router
  const router = useRouter();

  // função para lidar com a exclusão
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/transacoes/${id}`, {
        method: "DELETE",
      });

      // verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error("Falha ao excluir");
      }

      // mensagem de sucesso e atualiza a tabela
      toast.success("Excluído com successo");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir");
    }
  };

  // função para lidar com a edição
  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(`/api/transacoes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          titulo,
          descricao,
          valor,
          tipo,
          categoriaId: categoria.id,
        }),
      });

      // verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error("Falha ao editar");
      }
      // mensagem de sucesso e atualiza a tabela
      toast.success("Editado com successo");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao editar");
    }
  };

  // transforma a data em formato brasileiro
  const dataFormatada = new Date(criadoEm).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });

  return (
    <TableRow
      className={`
    border-2
    ${
      tipo === "DESPESA"
        ? "bg-red-50 border-red-300"
        : "bg-green-50 border-green-300"
    }
  `}
    >
      <TableCell className="font-medium">{dataFormatada}</TableCell>
      <TableCell className="font-medium">{titulo}</TableCell>
      <TableCell className="font-medium">{descricao || "-"}</TableCell>
      <TableCell className="font-medium">
        {Number(valor).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell className="font-medium">{categoria.nome}</TableCell>
      <TableCell className="font-medium">
        <Badge
          variant={tipo === "DESPESA" ? "destructive" : "default"}
          className={
            tipo === "DESPESA"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-700 hover:bg-green-800"
          }
        >
          {tipo === "DESPESA" ? "Despesa" : "Receita"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button onClick={() => handleDelete(id)}>Excluir</Button>
          <Button onClick={() => handleEdit(id)}>Editar</Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
