import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import type { LinhaTabela } from "@/types/linha";
type TableLogProps = {
  dados: LinhaTabela[];
};
export default function TableLog({ dados }: TableLogProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Data</TableHead>
          <TableHead className="text-left">Nome</TableHead>
          <TableHead className="text-left">Valor</TableHead>
          <TableHead className="text-left">Categoria</TableHead>
          <TableHead className="text-left">Tipo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dados.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-left">
              {new Date(item.criadoEm).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell className="text-left">{item.titulo}</TableCell>
            <TableCell className="text-left">{item.valor}</TableCell>
            <TableCell className="text-left">{item.categoria.nome}</TableCell>
            <TableCell className="text-left">{item.tipo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
