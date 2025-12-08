import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function HeaderTable() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-left">Data</TableHead>
        <TableHead className="text-left">Nome</TableHead>
        <TableHead className="text-left">Descrição</TableHead>
        <TableHead className="text-left">Valor</TableHead>
        <TableHead className="text-left">Categoria</TableHead>
        <TableHead className="text-left">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
}
