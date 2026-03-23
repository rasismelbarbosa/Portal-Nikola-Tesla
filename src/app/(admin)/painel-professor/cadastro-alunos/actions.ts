"use server";

import { createClient } from "@/utils/supabase/server";
import { formSchema } from "@/schemas/registration-schema";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
// import { DEADLINE } from "@/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function submitRegistration(prevState: any, formData: FormData) {
  const supabase = await createClient();

  // 1. Transformar FormData em Objeto JS
  const rawData = {
    fullName: formData.get("fullName"),
    birthDate: formData.get("birthDate"),
    studentClass: formData.get("studentClass"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email"),
    guardianName: formData.get("guardianName"),
    guardianPhone: formData.get("guardianPhone"),
    availableHours: formData.get("availableHours") === "on", // Checkboxes enviam "on" se marcados
    commitmentAgreement: formData.get("commitmentAgreement") === "on",
    motivation: formData.get("motivation"),
    hasExperience: formData.get("hasExperience") === "on",
    experienceDetails: formData.get("experienceDetails"),
    termAcknowledgment: formData.get("termAcknowledgment") === "on",
  };

  // 2. Validar
  const validated = formSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Verifique os campos obrigatórios.",
    };
  }

  // 3. Salvar no Banco
  const { error } = await supabase.from("registrations").insert({
    full_name: validated.data.fullName,
    birth_date: validated.data.birthDate,
    student_class: validated.data.studentClass,
    whatsapp: validated.data.whatsapp,
    email: validated.data.email,
    guardian_name: validated.data.guardianName,
    guardian_phone: validated.data.guardianPhone,
    available_hours: validated.data.availableHours,
    commitment_agreement: validated.data.commitmentAgreement,
    motivation: validated.data.motivation,
    has_robotics_experience: validated.data.hasExperience,
    experience_details: validated.data.experienceDetails,
  });

  if (error) {
    console.error("Erro Supabase:", error);
    return {
      success: false,
      message: "Erro ao salvar inscrição. Tente novamente.",
    };
  }

  // 🟢 MAGIA DOS E-MAILS: Disparo de Confirmação de Receção
  try {
    await transporter.sendMail({
      from: `"Projeto Nikola Tesla" <${process.env.EMAIL_USER}>`,
      to: validated.data.email, // ATENÇÃO: Confirme se a sua variável do e-mail do candidato se chama assim
      subject: "Inscrição Recebida! Bem-vindo à fila de espera 🚀",
      html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #059975;">Olá, ${validated.data.fullName}!</h2>
            <p>Os seus radares estão funcionando perfeitamente: <strong>a sua inscrição foi recebida com sucesso na nossa Torre de Controle!</strong></p>
            <p>Neste momento, o seu perfil está em análise pela nossa equipe de coordenação.</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00d4ff;">
              <p style="margin: 0;"><strong>O que acontece agora?</strong></p>
              <p style="margin: 10px 0 0 0;">Fique de olho no seu Email. Assim que abrirmos novas vagas e o seu perfil for aprovado, enviaremos um e-mail com as suas credenciais de acesso oficiais à Base Tesla.</p>
            </div>
            <p>Até breve, futuro inventor!</p>
            <br/>
            <p>Equipe do Projeto Nikola Tesla</p>
          </div>
        `,
    });
  } catch (erroEmail) {
    console.error(
      "Aviso: A inscrição foi guardada, mas o e-mail de confirmação falhou.",
      erroEmail,
    );
  }
}
