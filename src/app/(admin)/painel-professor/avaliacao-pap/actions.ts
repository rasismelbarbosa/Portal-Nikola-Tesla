"use server";

import { createClient } from "@/utils/supabase/server";

export async function registarAvaliacaoPap(dados: {
  aluno_id: string;
  missao_nome: string;
  torrance_fluidez: number;
  torrance_flexibilidade: number;
  torrance_originalidade: number;
  torrance_elaboracao: number;
}) {
  try {
    const supabase = await createClient();

    // 1. Calcula a Nota Final (Média dos 4 eixos criativos)
    const media =
      (dados.torrance_fluidez +
        dados.torrance_flexibilidade +
        dados.torrance_originalidade +
        dados.torrance_elaboracao) /
      4;
    const nota_final = parseFloat(media.toFixed(1));

    // 2. Guarda a avaliação na tabela 'avaliacoes_pap_pc'
    const { error: erroPap } = await supabase.from("avaliacoes_pap_pc").insert({
      aluno_id: dados.aluno_id,
      missao_nome: dados.missao_nome,
      torrance_fluidez: dados.torrance_fluidez,
      torrance_flexibilidade: dados.torrance_flexibilidade,
      torrance_originalidade: dados.torrance_originalidade,
      torrance_elaboracao: dados.torrance_elaboracao,
      nota_final: nota_final,
    });

    if (erroPap)
      return {
        sucesso: false,
        erro: "Erro ao guardar a avaliação do Portfólio: " + erroPap.message,
      };

    // 3. GAMIFICAÇÃO: Converte a criatividade em XP!
    const xpGanho = Math.round(nota_final * 100);

    // 4. Vai buscar o perfil atual do aluno para somar o XP
    const { data: aluno, error: erroAluno } = await supabase
      .from("alunos")
      .select("xp_atual, xp_proximo_nivel, nivel")
      .eq("id", dados.aluno_id)
      .single();

    if (aluno && !erroAluno) {
      const novoXp = aluno.xp_atual + xpGanho;
      let novoNivel = aluno.nivel;
      let novoXpProximo = aluno.xp_proximo_nivel;

      // 5. Verifica se a criatividade fez o aluno SUBIR DE NÍVEL!
      if (novoXp >= novoXpProximo) {
        novoNivel = "Engenheiro Júnior"; // Patente seguinte
        novoXpProximo = novoXpProximo + 2000;
      }

      // 6. Atualiza o perfil do aluno
      await supabase
        .from("alunos")
        .update({
          xp_atual: novoXp,
          nivel: novoNivel,
          xp_proximo_nivel: novoXpProximo,
        })
        .eq("id", dados.aluno_id);
    }

    return { sucesso: true, xpGanho, nota_final };
  } catch (error) {
    return { sucesso: false, erro: "Erro inesperado no servidor." };
  }
}
