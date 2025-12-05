import RowTable from "./TableRow";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { LinhaTabela } from "@/types/linha";

export default function TableList({ dados }: { dados: LinhaTabela[] }) {
  return (
    <TableBody>
      {/* se não tiver dados, renderize uma linha informando que não há dados */}
      {dados.length === 0 && (
        <TableRow>
          <TableCell colSpan={6} className="text-center">
            Nenhum resultado
          </TableCell>
        </TableRow>
      )}
      {/* se houver dados, renderize-os */}
      {dados.map((item) => (
        <RowTable key={item.id} {...item} />
      ))}
    </TableBody>
  );
}
