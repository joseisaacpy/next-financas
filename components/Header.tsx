"use client";
import { useState } from "react";
import { navItems } from "@/data/NavLinks";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Close } from "@radix-ui/react-dialog";

export default function Header() {
  // pegar a rota atual
  const pathname = usePathname();
  // estado para controlar o menu mobile
  const [menuMobile, setMenuMobile] = useState<boolean>(false);
  return (
    <header className="bg-gray-800">
      <nav className="flex justify-between px-4 py-2 md:justify-around items-center">
        {/* logo */}
        <h1 className="text-2xl font-bold text-white">NextFinanças</h1>

        {/* botão para abrir o menu */}
        <Button
          className="md:hidden"
          variant={"ghost"}
          onClick={() => setMenuMobile(!menuMobile)}
        >
          <Menu className="w-6 h-6 text-white" />
        </Button>

        {/* menu mobile */}
        <ul
          className={`${
            menuMobile ? "flex" : "hidden"
          } absolute top-0 left-0 w-full h-screen flex-col items-center justify-center gap-2 bg-gray-800 text-white`}
        >
          {/* botão para abrir o menu */}
          <Button
            className="md:hidden"
            variant={"ghost"}
            onClick={() => setMenuMobile(!menuMobile)}
          >
            <Menu className="w-6 h-6 text-white" />
          </Button>

          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <Button
                  onClick={() => setMenuMobile(!menuMobile)}
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

        {/* menu desktop */}
        <ul className="hidden md:flex">
          {navItems.map((item) => (
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
