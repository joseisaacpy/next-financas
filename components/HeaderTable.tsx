import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function HeaderTable() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Data</TableHead>
        <TableHead>Nome</TableHead>
        <TableHead>Descrição</TableHead>
        <TableHead>Valor</TableHead>
        <TableHead>Categoria</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
}
