import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { LinhaTabela } from "@/types/linha";
import { toast } from "sonner";

export default function RowTable({
  id,
  titulo,
  descricao,
  valor,
  categoria,
  criadoEm,
}: LinhaTabela) {
  // função para lidar com a exclusão
  const handleDelete = async (id: number) => {
    try {
      toast.success("Excluido com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir");
    }
  };

  // função para lidar com a edição
  const handleEdit = async (id: number) => {
    try {
      toast.success("Editado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao editar");
    }
  };
  return (
    <TableRow>
      <TableCell className="font-medium">
        {criadoEm.toLocaleDateString("pt-BR")}
      </TableCell>
      <TableCell className="font-medium">{titulo}</TableCell>
      <TableCell className="font-medium">{descricao}</TableCell>
      <TableCell className="font-medium">{valor}</TableCell>
      <TableCell className="font-medium">{categoria}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button onClick={() => handleDelete}>Excluir</Button>
          <Button onClick={() => handleEdit}>Editar</Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
