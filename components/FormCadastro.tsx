"use client";
import { useState, useEffect } from "react";
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
import { FormData } from "@/types/formData";

export default function FormCadastro() {
  // estado para armazenar as categorias
  const [categorias, setCategoria] = useState<Categoria[]>([]);

  // objeto do form
  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    descricao: "",
    valor: 0,
    tipo: "",
    categoriaId: "",
    data: new Date().toISOString().split("T")[0],
  });

  //   função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // evitar o comportamento padrão do formulário
    e.preventDefault();

    // verificar se todos os campos obrigatórios foram preenchidos
    if (
      !formData.titulo ||
      !formData.valor ||
      !formData.categoriaId ||
      !formData.tipo ||
      !formData.data
    ) {
      toast.error("Preencha todos os campos");
      return;
    }
    console.table(formData);
    try {
      // enviar os dados para a API
      const response = await fetch(`/api/transacoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // verificar se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error("Erro ao cadastrar");
      }

      // limpar o formulário
      setFormData({
        titulo: "",
        descricao: "",
        valor: 0,
        tipo: "",
        categoriaId: "",
        data: new Date().toISOString().split("T")[0],
      });

      // mensagem de sucesso
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error(error);
      // mensagem de erro
      toast.error("Erro ao realizar o cadastro!");
    }
  };

  // função para buscar as categorias
  useEffect(() => {
    async function buscarCategorias() {
      try {
        const response = await fetch(`/api/categorias`);
        const data = await response.json();
        setCategoria(data.data);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar categorias");
      }
    }
    // chama a função
    buscarCategorias();
  }, []);
  return (
    // section
    <section className="section">
      {/* titulo */}
      <h1 className="title-primary mb-2">Cadastre uma nova transação</h1>
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
        </div>

        <div className="form-group">
          <Label htmlFor="valor">Valor:</Label>
          <Input
            type="number"
            step="0.01"
            id="valor"
            placeholder="Digite um valor"
            value={formData.valor}
            onChange={(e) =>
              setFormData({ ...formData, valor: Number(e.target.value) })
            }
          />
        </div>

        <div className="form-group">
          <Label htmlFor="tipo">Tipo:</Label>
          <Select
            value={formData.tipo}
            onValueChange={(value: "DESPESA" | "RECEITA") =>
              setFormData({ ...formData, tipo: value })
            }
          >
            <SelectTrigger aria-label="Selecione um tipo" className="w-full">
              <SelectValue placeholder="Selecione um tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo</SelectLabel>
                <SelectItem value="DESPESA">Despesa</SelectItem>
                <SelectItem value="RECEITA">Receita</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="form-group">
          <Label htmlFor="categoria">Categoria:</Label>
          <Select
            value={formData.categoriaId}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                categoriaId: value,
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
                  <SelectItem key={categoria.id} value={String(categoria.id)}>
                    {categoria.nome}
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
