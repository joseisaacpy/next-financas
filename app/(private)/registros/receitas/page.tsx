import { Table } from "@/components/ui/table";
import HeaderTable from "@/components/table/HeaderTable";
import TableList from "@/components/table/TableList";
import { prisma } from "@/lib/prisma";

export default async function Receitas() {
  const receitas = await prisma.transacao.findMany({
    where: {
      tipo: "RECEITA",
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
      <h1 className="title-primary">Receitas</h1>
      <Table>
        <HeaderTable />
        <TableList dados={receitas} />
      </Table>
    </section>
  );
}
