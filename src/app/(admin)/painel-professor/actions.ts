"use server";

import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

// Inicializa o Motor de E-mails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Inicializa a Chave Mestra do Supabase
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function aprovarCandidato(inscricaoId: string) {
  try {
    const { data: inscricao, error: erroInsc } = await supabaseAdmin
      .from("registrations")
      .select("*")
      .eq("id", inscricaoId)
      .single();

    if (erroInsc || !inscricao) return { erro: "Inscrição não encontrada." };

    const senhaPadrao = process.env.DEFAULT_PASSWORD;

    // Cria o utilizador no Auth
    const { data: authUser, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: inscricao.email,
        password: senhaPadrao,
        email_confirm: true,
      });

    if (authError) return { erro: "Erro ao gerar login: " + authError.message };

    // Insere o Aluno na tabela
    const { error: alunoError } = await supabaseAdmin.from("alunos").insert({
      id: authUser.user.id,
      matricula_email: inscricao.email,
      senha: senhaPadrao,
      nome: inscricao.full_name,
      turma: inscricao.student_class,
    });

    if (alunoError) return { erro: "Erro ao criar perfil do aluno." };

    // Apaga a inscrição
    await supabaseAdmin.from("registrations").delete().eq("id", inscricaoId);

    // 🟢 MAGIA DOS E-MAILS: Disparo de Boas-Vindas
    await transporter.sendMail({
      from: `Torre de Controlo Tesla <${process.env.EMAIL_USER}>`,
      to: inscricao.email,
      subject: "Acesso Liberado - Bem-vindo à Base Tesla! ⚡",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #956AD9;">Olá, ${inscricao.full_name}!</h2>
          <p>A sua inscrição para o <strong>Projeto Nikola Tesla</strong> foi avaliada e <strong>APROVADA</strong> com sucesso!</p>
          <p>Você é oficialmente um Inventor da nossa Base.</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>O seu E-mail de Acesso:</strong> ${inscricao.email}</p>
            <p style="margin: 10px 0 0 0;"><strong>A sua Palavra-passe:</strong> ${senhaPadrao}</p>
          </div>
          <p>Aceda ao seu painel para ver as suas missões e a sua Guilda.</p>
          <p>Estamos ansiosos para ver o que vai criar!</p>
          <br/>
          <p>Comandante do Projeto Nikola Tesla</p>
        </div>
      `,
    });
    return { sucesso: true, senha: senhaPadrao };
  } catch (error) {
    console.error("Erro Geral:", error);
    return { erro: "Ocorreu um erro inesperado no servidor." };
  }
}

export async function rejeitarCandidato(inscricaoId: string) {
  try {
    const { data: inscricao, error: erroBusca } = await supabaseAdmin
      .from("registrations")
      .select("*")
      .eq("id", inscricaoId)
      .single();

    if (erroBusca || !inscricao) return { erro: "Inscrição não encontrada." };

    // Apaga a inscrição
    const { error } = await supabaseAdmin
      .from("registrations")
      .delete()
      .eq("id", inscricaoId);

    if (error) return { erro: "Erro ao rejeitar e apagar a inscrição." };

    // 🔴 MAGIA DOS E-MAILS: Disparo de Rejeição (Educado)
    await transporter.sendMail({
      from: `"Projeto Nikola Tesla" <${process.env.EMAIL_USER}>`,
      to: inscricao.email,
      subject: "Atualização sobre a sua inscrição 🤖",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333;">Olá, ${inscricao.full_name}.</h2>
          <p>Agradecemos imenso o seu interesse em participar no <strong>Projeto Nikola Tesla</strong>.</p>
          <p>Infelizmente, neste momento as nossas vagas estão esgotadas ou o seu perfil não se adequa à fase atual do projeto, e não poderemos seguir com a sua inscrição.</p>
          <p>Iremos manter os seus dados em lista de espera e entraremos em contacto caso surjam novas oportunidades no futuro!</p>
          <br/>
          <p>Continue a inventar e a aprender!</p>
          <p>Equipe do Projeto Nikola Tesla</p>
        </div>
      `,
    });
    return { sucesso: true };
  } catch (error) {
    console.error("Erro Geral:", error);
    return { erro: "Ocorreu um erro inesperado no servidor." };
  }
}
