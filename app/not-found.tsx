import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="w-full h-screen px-3 md:p-0 flex flex-col items-center justify-center gap-2 text-center bg-linear-to-l from-gray-600 to-gray-800 text-white">
      <h1 className="text-2xl md:text-3xl font-bold">
        Ops, página não encontrada!
      </h1>
      <p className="text-lg md:text-xl">
        Ocorreu um erro ao tentar acessar essa pagina.
      </p>
      <Link href="/dashboard">
        <Button>
          Voltar para o início <ArrowLeft className="ml-2 animate-pulse" />
        </Button>
      </Link>
    </section>
  );
}
