"use server";

import { createClient } from "@/utils/supabase/server";

export async function criarGuilda(dados: { nome: string; descricao: string }) {
  try {
    const supabase = await createClient();

    // Insere a nova guilda no banco de dados
    const { error } = await supabase.from("guildas").insert({
      nome: dados.nome,
      descricao: dados.descricao,
    });

    if (error)
      return {
        sucesso: false,
        erro: "Erro ao forjar a Guilda: " + error.message,
      };

    return { sucesso: true };
  } catch (error) {
    return { sucesso: false, erro: "Erro inesperado no servidor." };
  }
}

export async function vincularAlunoGuilda(
  aluno_id: string,
  guilda_id: string | null,
) {
  try {
    const supabase = await createClient();

    // Atualiza o perfil do aluno com o ID da nova Guilda
    const { error } = await supabase
      .from("alunos")
      .update({ guilda_id: guilda_id })
      .eq("id", aluno_id);

    if (error)
      return {
        sucesso: false,
        erro: "Erro ao recrutar inventor: " + error.message,
      };

    return { sucesso: true };
  } catch (error) {
    return { sucesso: false, erro: "Erro inesperado no servidor." };
  }
}
