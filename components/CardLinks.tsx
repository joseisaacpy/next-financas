import {
  Card,
  CardHeader,
  CardContent,
  CardAction,
  CardTitle,
  CardFooter,
} from "./ui/card";
import Link from "next/link";
import type { NavItem } from "@/data/NavLinks";

export default function CardLinks({ name, description, href, icon }: NavItem) {
  return (
    <Link href={href}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <CardAction>
            <span className="link-menu">Acessar</span>
          </CardAction>
        </CardFooter>
      </Card>
    </Link>
  );
}
