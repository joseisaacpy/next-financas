import RowTable from "./TableRow";
import { Table, TableBody } from "@/components/ui/table";
import type { LinhaTabela } from "@/types/linha";

export default function TableList({ dados }: { dados: LinhaTabela[] }) {
  return (
    <Table>
      <TableBody>
        {dados.map((item) => (
          <RowTable key={item.id} {...item} />
        ))}
      </TableBody>
    </Table>
  );
}
