"use server";

import { createClient } from "@/utils/supabase/server";

export async function enviarTermometro(dados: {
  semana_letiva: string;
  q1_clareza: number;
  q2_seguranca: number;
  q3_desafio: number;
  q4_recursos: number;
  q5_ambiente: number;
  q6_utilidade: number;
  q7_motivacao: number;
  sugestao: string;
}) {
  try {
    const supabase = await createClient();

    // Confirma quem é o aluno que está a tentar enviar o relatório
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { sucesso: false, erro: "Acesso não autorizado à Base Tesla." };
    }

    // Insere as respostas na tabela (A regra RLS garante que o ID está correto)
    const { error } = await supabase.from("termometro_semanal").insert({
      aluno_id: user.id,
      semana_letiva: dados.semana_letiva,
      q1_clareza: dados.q1_clareza,
      q2_seguranca: dados.q2_seguranca,
      q3_desafio: dados.q3_desafio,
      q4_recursos: dados.q4_recursos,
      q5_ambiente: dados.q5_ambiente,
      q6_utilidade: dados.q6_utilidade,
      q7_motivacao: dados.q7_motivacao,
      sugestao: dados.sugestao,
    });

    if (error)
      return {
        sucesso: false,
        erro: "Falha nos sistemas de comunicação: " + error.message,
      };

    return { sucesso: true };
  } catch (err) {
    return { sucesso: false, erro: "Erro inesperado na transmissão de dados." };
  }
}
