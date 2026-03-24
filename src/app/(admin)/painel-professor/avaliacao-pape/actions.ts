"use server";

import { createClient } from "@/utils/supabase/server";

export async function registarAvaliacaoPape(dados: {
  aluno_id: string;
  missao_nome: string;
  nota_seguranca: number;
  nota_tecnica: number;
  nota_cidadania: number;
}) {
  try {
    const supabase = await createClient();

    // 1. A NOVA MATEMÁTICA DO PDF (Soma Exata em vez de Média)
    const soma =
      dados.nota_seguranca + dados.nota_tecnica + dados.nota_cidadania;
    const nota_final = parseFloat(soma.toFixed(1));

    // 2. Guarda a avaliação na tabela 'avaliacoes_pape'
    const { error: erroPape } = await supabase.from("avaliacoes_pape").insert({
      aluno_id: dados.aluno_id,
      missao_nome: dados.missao_nome,
      nota_seguranca: dados.nota_seguranca,
      nota_tecnica: dados.nota_tecnica,
      nota_cidadania: dados.nota_cidadania,
      nota_final: nota_final,
    });

    if (erroPape) {
      console.error("Erro no Supabase (Insert):", erroPape);
      return {
        sucesso: false,
        erro: "Erro ao guardar a avaliação: " + erroPape.message,
      };
    }

    // 3. A MAGIA DA GAMIFICAÇÃO: Converte a nota em XP (Ex: Nota 10 = 1000 XP)
    const xpGanho = Math.round(nota_final * 100);

    // 4. Vai buscar o perfil atual do aluno para somar o XP
    const { data: aluno, error: erroAluno } = await supabase
      .from("alunos")
      .select("xp_atual, xp_proximo_nivel, nivel, nota_pap_pc")
      .eq("id", dados.aluno_id)
      .single();

    if (erroAluno) {
      console.error("Erro no Supabase (Select Aluno):", erroAluno);
      return {
        sucesso: false,
        conserro: "Erro ao procurar aluno: " + erroAluno.message,
      };
    }

    if (aluno) {
      const novoXp = aluno.xp_atual + xpGanho;
      let novoNivel = aluno.nivel;
      let novoXpProximo = aluno.xp_proximo_nivel;

      // 5. Verifica se o aluno SUBIU DE NÍVEL!
      if (novoXp >= novoXpProximo) {
        novoNivel = "Engenheiro Júnior";
        novoXpProximo = novoXpProximo + 2000;
      }

      const valorPapPc = parseFloat(aluno.nota_pap_pc || 0);
      // Calcula: (Nota Final da PAPE + Nota do Portfólio) / 2
      const novaMedia = parseFloat(((nota_final + valorPapPc) / 2).toFixed(2));

      // 6. Atualiza o perfil do aluno
      const { error: erroUpdate } = await supabase
        .from("alunos")
        .update({
          xp_atual: novoXp,
          nivel: novoNivel,
          xp_proximo_nivel: novoXpProximo,
          nota_pape: nota_final, // <-- Guarda a nota bruta desta missão PAPE
          media: novaMedia,
        })
        .eq("id", dados.aluno_id);

      if (erroUpdate) {
        console.error("Erro no Supabase (Update Aluno):", erroUpdate);
        return {
          sucesso: false,
          erro: "Erro ao atualizar XP: " + erroUpdate.message,
        };
      }
    }

    return { sucesso: true, xpGanho, nota_final };
  } catch (error: any) {
    // 🟢 O DETETOR DE ERROS FOI ATIVADO AQUI!
    console.error("🚨 ERRO GRAVE NO SERVIDOR:", error);
    return {
      sucesso: false,
      erro: `Erro interno: ${error.message || "Verifique o terminal do VS Code"}`,
    };
  }
}
