import { prisma } from "@/lib/prisma";
import { Table } from "@/components/ui/table";
import HeaderTable from "@/components/table/HeaderTable";
import TableList from "@/components/table/TableList";
import { transformLista } from "@/utils/transformTransacao";

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
  const dados = transformLista(receitas);
  return (
    <section>
      <h1 className="title-primary">Receitas</h1>
      <Table>
        <HeaderTable />
        <TableList dados={dados} />
      </Table>
    </section>
  );
}
