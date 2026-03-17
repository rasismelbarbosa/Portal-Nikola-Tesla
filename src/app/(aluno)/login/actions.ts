"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function fazerLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Iniciamos a ligação segura ao Supabase
  const supabase = await createClient();

  // Tentamos fazer a autenticação nativa
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Se a palavra-passe estiver errada ou o utilizador não existir
    return {
      sucesso: false,
      mensagem: "Acesso negado. Verifique as suas credenciais.",
    };
  }

  // Se o login for bem-sucedido, o nosso Middleware (Tarefa 4)
  // vai tratar de o enviar para o painel correto automaticamente!
  // Aqui apenas damos o empurrão inicial para a raiz do painel.
  redirect("/painel");
}
