import { Table } from "@/components/ui/table";
import HeaderTable from "@/components/table/HeaderTable";
import TableList from "@/components/table/TableList";
import { prisma } from "@/lib/prisma";

export default async function Gastos() {
  const gastos = await prisma.gasto.findMany();
  return (
    <section>
      <h1 className="title-primary">Gastos</h1>
      <Table>
        <HeaderTable />
        <TableList dados={gastos} />
      </Table>
    </section>
  );
}
