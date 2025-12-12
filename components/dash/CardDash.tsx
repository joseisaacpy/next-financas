import { Card } from "../ui/card";
type CardDashProps = {
  title: string;
  value: number | string;
  subtitle?: string;
};

export default function CardDash({ title, subtitle, value }: CardDashProps) {
  return (
    <Card className="flex flex-col gap-2 hover">
      {/* título do card */}
      <h2 className="text-sm md:text-lg font-semibold text-center text-gray-600">
        {title}
      </h2>
      {/* se tiver subtítulo, renderize */}
      {subtitle && <p className="text-sm md:text-lg text-center">{subtitle}</p>}
      {/* valor do card */}
      <p className="text-2xl text-center font-semibold">{value}</p>
    </Card>
  );
}
