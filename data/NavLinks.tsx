import {
  Home,
  BarChart,
  Calendar,
  CreditCard,
  DollarSign,
  PieChart,
} from "lucide-react";

type NavItem = {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

export const navItems: NavItem[] = [
  {
    name: "Início",
    description: "Acesse o painel de controle.",
    href: "/",
    icon: <Home />,
  },
  {
    name: "Despesas",
    description: "Veja e gerencie todas as suas despesas registradas.",
    href: "/despesas",
    icon: <CreditCard />,
  },
  {
    name: "Nova Despesa",
    description: "Adicione uma nova despesa ao seu controle.",
    href: "/despesas/novo",
    icon: <DollarSign />,
  },
  {
    name: "Nova Receita",
    description: "Registre um novo ganho ou entrada de dinheiro.",
    href: "/receitas/nova",
    icon: <Calendar />,
  },
  {
    name: "Receitas",
    description: "Acompanhe todas as suas entradas de renda.",
    href: "/receitas",
    icon: <BarChart />,
  },
  {
    name: "Resumo",
    description: "Visualize um balanço geral das suas finanças.",
    href: "/dashboard",
    icon: <PieChart />,
  },
];
