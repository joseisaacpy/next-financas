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
    name: "Nova Transação",
    description: "Cadastre uma nova transação(despesa ou receita).",
    href: "/cadastro",
    icon: <DollarSign />,
  },
  {
    name: "Categorias",
    description: "Visualize e gerencie suas categorias.",
    href: "/categorias",
    icon: <Calendar />,
  },
  {
    name: "Nova Categoria",
    description: "Adicione uma nova categoria ao seu controle.",
    href: "/categorias/nova",
    icon: <Calendar />,
  },
  {
    name: "Despesas",
    description: "Veja e gerencie todas as suas despesas registradas.",
    href: "/despesas",
    icon: <CreditCard />,
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
