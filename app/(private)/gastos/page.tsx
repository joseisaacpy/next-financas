import { Table } from "@/components/ui/table";
import HeaderTable from "@/components/table/HeaderTable";

export default async function Gastos() {
  return (
    <section>
      <h1 className="title-primary">Gastos</h1>
      <Table>
        <HeaderTable />
      </Table>
    </section>
  );
}
