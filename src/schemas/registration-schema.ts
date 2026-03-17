import { z } from "zod";

export const formSchema = z
  .object({
    fullName: z.string().min(3, "Nome completo é obrigatório"),
    birthDate: z
      .string()
      .refine(
        (date) =>
          new Date(date).toString() !== "Invalid Date" &&
          new Date(date) < new Date(),
        "Data inválida",
      ),

    // CORREÇÃO: Usando a sintaxe padrão que a Vercel aceita sem reclamar
    studentClass: z.enum(["8A", "8B", "9A"]),

    whatsapp: z.string().min(10, "WhatsApp deve ter DDD + número"),
    email: z.string().email("E-mail inválido"),

    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),

    availableHours: z
      .boolean()
      .refine(
        (val) => val === true,
        "Você precisa confirmar a disponibilidade",
      ),
    commitmentAgreement: z
      .boolean()
      .refine(
        (val) => val === true,
        "Você precisa concordar com a assiduidade",
      ),

    motivation: z
      .string()
      .min(10, "Por favor, conte um pouco mais sobre seu interesse"),

    hasExperience: z.boolean().default(false),
    experienceDetails: z.string().optional(),

    termAcknowledgment: z
      .boolean()
      .refine(
        (val) => val === true,
        "Você precisa confirmar que entregará o termo",
      ),
  })
  .superRefine((data, ctx) => {
    const birth = new Date(data.birthDate);
    const age = new Date().getFullYear() - birth.getFullYear();

    if (age < 18) {
      if (!data.guardianName || data.guardianName.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guardianName"],
          message: "Nome do responsável é obrigatório",
        });
      }
      if (!data.guardianPhone || data.guardianPhone.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guardianPhone"],
          message: "Telefone do responsável é obrigatório",
        });
      }
    }

    if (
      data.hasExperience &&
      (!data.experienceDetails || data.experienceDetails.length < 3)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["experienceDetails"],
        message: "Por favor, detalhe sua experiência",
      });
    }
  });
