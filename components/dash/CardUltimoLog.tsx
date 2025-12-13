import { Card } from "../ui/card";
import type { TipoTransacao } from "@/types/tipoTransacao";

type CardDashUltimoLogProps = {
  title: string;
  tipo: TipoTransacao;
  value: number | string;
};

export default function CardUltimoLog({
  title,
  tipo,
  value,
}: CardDashUltimoLogProps) {
  const borderColor =
    tipo === "DESPESA" ? "border-red-600" : "border-green-600";

  const textBase = "text-sm md:text-lg font-semibold text-gray-600";

  return (
    <Card
      className={`${borderColor} flex flex-col gap-2 text-center border-2 hover:shadow-md hover`}
    >
      <h2 className={`${textBase}`}>Última transação</h2>
      <p className={`${textBase}`}>{tipo}</p>

      <h3 className={textBase}>{title}</h3>

      <p
        className={`text-2xl md:text-3xl font-bold ${
          tipo === "DESPESA" ? "text-red-600" : "text-green-600"
        }`}
      >
        {value}
      </p>
    </Card>
  );
}
