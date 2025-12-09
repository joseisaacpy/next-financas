"use client";
import { navItems } from "@/data/NavLinks";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  // retornar apenas links que são diferente de "/", pois ele é o link para o painel de controle
  const navFilter = navItems.filter((item) => item.href !== "/");
  // pegar a rota atual
  const pathname = usePathname();
  return (
    <header className="bg-gray-800">
      <nav className="flex justify-between px-4 py-2 md:justify-around items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-white">Logo</h1>
        </Link>

        {/* menu mobile */}
        <div className="md:hidden">
          <Menu className="text-white" />
        </div>

        {/* menu desktop */}
        <ul className="hidden md:flex">
          {navFilter.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <Button
                  variant="link"
                  className={
                    pathname === item.href ? "text-blue-300" : "text-white"
                  }
                >
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
