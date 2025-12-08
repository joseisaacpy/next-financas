import { Home, Calendar, CreditCard, DollarSign, PieChart } from "lucide-react";

export type NavItem = {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

export const navItems: NavItem[] = [
  {
    name: "Início",
    href: "/",
    icon: <Home />,
    description: "Acesse o painel de controle.",
  },
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
    name: "Categorias",
    href: "/categorias",
    icon: <Calendar />,
    description: "Gerencie suas categorias.",
  },
  {
    name: "Resumo",
    href: "/dashboard",
    icon: <PieChart />,
    description: "Acompanhe seu balanço financeiro.",
  },
];
