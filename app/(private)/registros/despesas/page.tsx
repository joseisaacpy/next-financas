import { Table } from "@/components/ui/table";
import HeaderTable from "@/components/table/HeaderTable";
import TableList from "@/components/table/TableList";
import { prisma } from "@/lib/prisma";

export default async function Gastos() {
  const despesas = await prisma.transacao.findMany({
    where: {
      tipo: "DESPESA",
    },
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      categoria: true,
    },
  });
  return (
    <section>
      <h1 className="title-primary">Despesas</h1>
      <Table>
        <HeaderTable />
        <TableList dados={despesas} />
      </Table>
    </section>
  );
}
