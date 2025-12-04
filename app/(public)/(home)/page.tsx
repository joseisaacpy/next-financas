import { navItems } from "@/data/NavLinks";
import Link from "next/link";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Painel de Controle",
  description: "Painel de Controle",
};

export default function Home() {
  // retornar apenas links que são diferente de "/", pois ele é o link para o painel de controle
  const navFilter = navItems.filter((item) => item.href !== "/");
  return (
    <section className="section">
      {/* texto */}
      <div className="space-y-2 mb-2">
        <h1 className="title-primary">Bem-vindo ao Painel de Navegação</h1>
        <p className="paragraph">
          Selecione uma das opções abaixo para navegar pelas ferramentas.
        </p>
      </div>
      {/* links */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {navFilter.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="link-menu">
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
