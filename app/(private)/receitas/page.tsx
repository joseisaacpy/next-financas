import { Table } from "@/components/ui/table";
import HeaderTable from "@/components/table/HeaderTable";

export default async function Receitas() {
  return (
    <section>
      <h1 className="title-primary">Receitas</h1>
      <Table>
        <HeaderTable />
      </Table>
    </section>
  );
}
