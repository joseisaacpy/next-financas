import RowTable from "./TableRow";
import { TableBody } from "@/components/ui/table";
import type { LinhaTabela } from "@/types/linha";

export default function TableList({ dados }: { dados: LinhaTabela[] }) {
  return (
    <TableBody>
      {dados.map((item) => (
        <RowTable key={item.id} {...item} />
      ))}
    </TableBody>
  );
}
