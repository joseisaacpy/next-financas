import { prisma } from "@/lib/prisma";
import { Table } from "@/components/ui/table";
import HeaderTable from "@/components/table/HeaderTable";
import TableList from "@/components/table/TableList";
import { transformLista } from "@/utils/transformTransacao";

export default async function Registros() {
  const registros = await prisma.transacao.findMany({
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      categoria: true,
    },
  });
  const dados = transformLista(registros);
  return (
    <section>
      <h1 className="title-primary">Todos os registros</h1>
      <Table>
        <HeaderTable />
        <TableList dados={dados} />
      </Table>
    </section>
  );
}
