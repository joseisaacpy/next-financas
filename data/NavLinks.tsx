import { CreditCard, DollarSign, PieChart } from "lucide-react";

export type NavItem = {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

export const navItems: NavItem[] = [
  {
    name: "Nova Transação",
    href: "/cadastro",
    icon: <DollarSign />,
    description: "Cadastre uma nova transação.",
  },
  {
    name: "Transações",
    href: "/transacoes",
    icon: <CreditCard />,
    description: "Veja e gerencie todas as transações.",
  },
  {
    name: "Dashboard",
    href: "/",
    icon: <PieChart />,
    description: "Acompanhe seu balanço financeiro.",
  },
];
