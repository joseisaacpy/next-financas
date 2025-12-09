import { prisma } from "@/lib/prisma";
import { Table } from "@/components/ui/table";
import HeaderTable from "@/components/table/HeaderTable";
import TableList from "@/components/table/TableList";
import { transformLista } from "@/utils/transformTransacao";

// para carregar dados do servidor sem cache
export const dynamic = "force-dynamic";

export default async function Transacoes() {
  const transacoes = await prisma.transacao.findMany({
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      categoria: true,
    },
  });
  const dados = transformLista(transacoes);
  return (
    <section>
      <h1 className="title-primary">Todas as transações</h1>
      <Table>
        <HeaderTable />
        <TableList dados={dados} />
      </Table>
    </section>
  );
}
