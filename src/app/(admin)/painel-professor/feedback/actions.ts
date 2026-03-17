"use server";

import { createClient } from "@/utils/supabase/server";

export async function registarFeedback(dados: {
  aluno_id: string;
  missao_nome: string;
  pontos_fortes: string;
  plano_acao: string;
}) {
  try {
    const supabase = await createClient();

    // Guarda o feedback na tabela 'feedbacks'
    const { error } = await supabase.from("feedbacks").insert({
      aluno_id: dados.aluno_id,
      missao_nome: dados.missao_nome,
      pontos_fortes: dados.pontos_fortes,
      plano_acao: dados.plano_acao,
    });

    if (error)
      return {
        sucesso: false,
        erro: "Erro ao guardar o feedback: " + error.message,
      };

    return { sucesso: true };
  } catch (error) {
    return { sucesso: false, erro: "Erro inesperado no servidor." };
  }
}
