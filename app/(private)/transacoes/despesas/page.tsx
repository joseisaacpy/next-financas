import { prisma } from "@/lib/prisma";
import { Table } from "@/components/ui/table";
import HeaderTable from "@/components/table/HeaderTable";
import TableList from "@/components/table/TableList";
import { transformLista } from "@/utils/transformTransacao";

export default async function Despesas() {
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
  const dados = transformLista(despesas);

  return (
    <section>
      <h1 className="title-primary">Despesas</h1>
      <Table>
        <HeaderTable />
        <TableList dados={dados} />
      </Table>
    </section>
  );
}
