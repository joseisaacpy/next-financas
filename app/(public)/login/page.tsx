"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  // router
  const router = useRouter();
  // estado para controlar o formulário
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  // estado para input de senha
  const [showSenha, setShowSenha] = useState<boolean>(false);

  // função para lidar com o envio do formulário
  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // valida se os campos foram preenchidos
    if (!form.email || !form.senha) {
      toast.error("Preencha todos os campos");
      return;
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Erro ao logar");
      }

      const data = await response.json();

      toast.success(data.message);

      // redireciona para a rota de dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao logar");
    }
  };
  return (
    <section className="section">
      <h1 className="title-primary">Bem-vindo de volta!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <Label htmlFor="email">E-mail:</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <Label htmlFor="senha">Senha:</Label>
          <div className="flex items-center gap-2">
            <Input
              type={showSenha ? "text" : "password"}
              name="senha"
              id="senha"
              placeholder="Senha"
              onChange={(e) =>
                setForm({
                  ...form,
                  senha: e.target.value,
                })
              }
            />
            <Button type="button" onClick={() => setShowSenha(!showSenha)}>
              {showSenha ? <Eye /> : <EyeOff />}
            </Button>
          </div>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </section>
  );
}
