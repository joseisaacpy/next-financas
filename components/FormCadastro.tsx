"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Categoria } from "@/types/categoria";
import { useCategorias } from "@/hooks/categorias";

export default function FormCadastro({ tipo }: Categoria) {
  // faz um filtro de categorias com base no tipo do formulário
  const categorias = useCategorias(tipo);

  // objeto do form
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    valor: 0,
    data: "",
    categoria: "",
  });
  //   função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // evitar o comportamento padrão do formulário
    e.preventDefault();

    // verificar se todos os campos obrigatórios foram preenchidos
    if (!formData.titulo || !formData.data || !formData.categoria) {
      toast.error("Preencha todos os campos");
      return;
    }
    try {
      // enviar os dados para a API
      const response = await fetch(
        `/api/${tipo === "gasto" ? "gastos" : "receitas"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      // verificar se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error("Erro ao cadastrar");
      }
      // obter os dados da resposta
      const data = await response.json();

      // limpar o formulário
      setFormData({
        titulo: "",
        descricao: "",
        valor: 0,
        data: "",
        categoria: "",
      });

      // mensagem de sucesso
      toast.success(
        `${
          tipo === "gasto"
            ? "Gasto cadastrado com sucesso"
            : "Receita cadastrada com sucesso"
        }`
      );
    } catch (error) {
      console.error(error);
      // mensagem de erro
      toast.error(
        `${
          tipo === "gasto"
            ? "Erro ao cadastrar gasto"
            : "Erro ao cadastrar receita"
        }`
      );
    }
  };
  return (
    // section
    <section className="section">
      {/* titulo */}
      <h1 className="title-primary mb-2">
        {tipo === "gasto" ? "Novo Gasto" : "Nova Receita"}
      </h1>
      {/* form */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <Label htmlFor="titulo">Título:</Label>
          <Input
            type="text"
            id="titulo"
            placeholder="Digite um título"
            value={formData.titulo}
            onChange={(e) =>
              setFormData({ ...formData, titulo: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <Label htmlFor="descricao">Descrição:</Label>
          <Input
            type="text"
            id="descricao"
            placeholder="Digite uma descrição"
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
          />

          <div className="form-group">
            <Label htmlFor="valor">Valor:</Label>
            <Input
              type="number"
              step="0.01"
              id="valor"
              placeholder="Digite um valor"
              value={formData.valor}
              onChange={(e) =>
                setFormData({ ...formData, valor: parseFloat(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <Label htmlFor="categoria">Categoria:</Label>
          <Select
            value={formData.categoria}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                categoria: value,
              })
            }
          >
            <SelectTrigger
              aria-label="Selecione uma categoria"
              className="w-full"
            >
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="form-group">
          <Label htmlFor="data">Data:</Label>
          <Input
            type="date"
            id="data"
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
          />
        </div>
        <Button type="submit">Salvar</Button>
      </form>
    </section>
  );
}
