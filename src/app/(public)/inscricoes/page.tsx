"use client";

import { useState, useEffect, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

// Seus imports lógicos (Mantenha os mesmos caminhos que você já usa)
import { formSchema } from "@/schemas/registration-schema";
import { submitRegistration } from "./actions"; // Ajuste o caminho se necessário
import { DEADLINE } from "@/config"; // Ajuste o caminho se necessário

// Imports do Material UI
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Container,
  Alert,
} from "@mui/material";

// Ícones do MUI
import LockIcon from "@mui/icons-material/Lock";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import DownloadIcon from "@mui/icons-material/Download";

export default function InscricoesTesla() {
  // ==========================================
  // ESTADOS E LÓGICA (Mantidos do seu original)
  // ==========================================
  const [state, formAction, isPending] = useActionState(
    submitRegistration,
    null,
  );
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = DEADLINE.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasExperience: false,
      availableHours: false,
      commitmentAgreement: false,
      termAcknowledgment: false,
    },
  });

  const birthDate = watch("birthDate");
  const isMinor = birthDate
    ? new Date().getFullYear() - new Date(birthDate).getFullYear() < 18
    : false;
  const hasExperience = watch("hasExperience");

  // ==========================================
  // TELA DE ENCERRADO
  // ==========================================
  if (isExpired) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#956AD9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            borderRadius: 4,
            textAlign: "center",
            py: 6,
            px: 3,
          }}
        >
          <LockIcon sx={{ fontSize: 80, color: "#FF7F50", mb: 2 }} />
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{ color: "#FF7F50", textTransform: "uppercase", mb: 2 }}
          >
            Inscrições Encerradas
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            O prazo para se inscrever no Projeto Nikola Tesla chegou ao fim.
            Agradecemos o interesse!
          </Typography>
          <Alert severity="info" sx={{ textAlign: "left", borderRadius: 2 }}>
            Fique ligado nas redes sociais da escola para as próximas etapas.
          </Alert>
        </Card>
      </Box>
    );
  }

  // ==========================================
  // TELA DE INSCRIÇÃO ATIVA
  // ==========================================
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#956AD9", pt: 12, pb: 10 }}>
      <Container maxWidth="md">
        {/* CABEÇALHO HERO */}
        <Box sx={{ textAlign: "center", mb: 6, color: "white" }}>
          <Box
            sx={{
              position: "relative",
              width: 150,
              height: 150,
              mx: "auto",
              mb: 2,
            }}
          >
            <Image
              src="/logo-tesla-branco.svg"
              alt="Logo Tesla"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
          <Typography
            variant="h3"
            fontWeight="900"
            sx={{
              textTransform: "uppercase",
              textShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            Projeto{" "}
            <Box component="span" sx={{ color: "#FFF700" }}>
              Nikola Tesla
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#FFF700", letterSpacing: 2, mt: 1 }}
          >
            2026 • ROBÓTICA & INOVAÇÃO
          </Typography>
        </Box>

        {/* CARD DA MISSÃO GAMIFICADA */}
        <Card
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 247, 0, 0.3)",
            borderRadius: 4,
            mb: 6,
            color: "white",
          }}
        >
          <CardContent sx={{ textAlign: "center", p: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "#FFF700",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <ElectricBoltIcon /> Missão: Proteger o Futuro!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem" }}>
              <strong>Nikola Tesla precisa de você!</strong> O futuro está
              ameaçado pelo lixo eletrônico. Sua missão é se tornar um{" "}
              <strong>Urbanista Maker</strong>.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
              Aprenda a construir robôs, participe de{" "}
              <strong>Guildas de Inventores</strong> e use impressão 3D para
              resolver problemas da comunidade.
            </Typography>
          </CardContent>
        </Card>

        {/* O FORMULÁRIO */}
        <Card
          sx={{ borderRadius: 4, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
        >
          <Box
            sx={{
              bgcolor: "#f8f9fa",
              py: 3,
              borderBottom: "1px solid #eee",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="900"
              sx={{ color: "#059975", textTransform: "uppercase" }}
            >
              Ficha de Inscrição
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            {/* TIMER */}
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 6 }}
            >
              {Object.entries(timeLeft).map(([unit, value]) => (
                <Box key={unit} sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      bgcolor: "#956AD9",
                      color: "#FFF700",
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      fontSize: "1.5rem",
                      fontWeight: "900",
                      boxShadow: 2,
                    }}
                  >
                    {String(value).padStart(2, "0")}
                  </Box>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="text.secondary"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {unit === "days"
                      ? "Dias"
                      : unit === "hours"
                        ? "Horas"
                        : unit === "minutes"
                          ? "Min"
                          : "Seg"}
                  </Typography>
                </Box>
              ))}
            </Box>

            <form action={formAction}>
              {/* 1. DADOS PESSOAIS */}
              <Box sx={{ mb: 5 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: "#956AD9",
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "#FFF700",
                      color: "#956AD9",
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                      fontSize: "1rem",
                    }}
                  >
                    1
                  </Box>
                  Dados do Aluno
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* Linha 1: Nome Completo (Ocupa 100% da largura) */}
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    variant="outlined"
                    {...register("fullName")}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message as string}
                  />

                  {/* Linha 2: Data e Turma (Metade pra cada no PC, 1 embaixo do outro no celular) */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 3,
                    }}
                  >
                    <TextField
                      fullWidth
                      type="date"
                      label="Data de Nascimento"
                      InputLabelProps={{ shrink: true }}
                      {...register("birthDate")}
                      error={!!errors.birthDate}
                      helperText={errors.birthDate?.message as string}
                    />

                    <TextField
                      select
                      fullWidth
                      label="Sua Turma"
                      defaultValue=""
                      {...register("studentClass")}
                      error={!!errors.studentClass}
                      helperText={errors.studentClass?.message as string}
                    >
                      <MenuItem value="8A">8º Ano A</MenuItem>
                      <MenuItem value="8B">8º Ano B</MenuItem>
                      <MenuItem value="9A">9º Ano A</MenuItem>
                    </TextField>
                  </Box>

                  {/* Linha 3: WhatsApp e E-mail */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 3,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="WhatsApp"
                      placeholder="(84) 99999-9999"
                      {...register("whatsapp")}
                      error={!!errors.whatsapp}
                      helperText={errors.whatsapp?.message as string}
                    />
                    <TextField
                      fullWidth
                      type="email"
                      label="E-mail"
                      placeholder="aluno@email.com"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message as string}
                    />
                  </Box>
                </Box>
              </Box>

              {/* 2. DADOS DO RESPONSÁVEL (MENOR DE IDADE) */}
              {isMinor && (
                <Box
                  sx={{
                    mb: 5,
                    p: 3,
                    bgcolor: "#fff3e0",
                    border: "2px solid #FF7F50",
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      color: "#FF7F50",
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <WarningAmberIcon /> Aluno Menor de Idade
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Precisamos dos contatos do seu responsável legal.
                  </Typography>

                  {/* Linha única: Nome e Telefone do Responsável */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 3,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Nome do Responsável"
                      {...register("guardianName")}
                      error={!!errors.guardianName}
                      helperText={errors.guardianName?.message as string}
                    />
                    <TextField
                      fullWidth
                      label="Telefone do Responsável"
                      {...register("guardianPhone")}
                      error={!!errors.guardianPhone}
                      helperText={errors.guardianPhone?.message as string}
                    />
                  </Box>
                </Box>
              )}

              {/* 3. MOTIVAÇÃO E EXPERIÊNCIA */}
              <Box sx={{ mb: 5 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: "#956AD9",
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "#FFF700",
                      color: "#956AD9",
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                      fontSize: "1rem",
                    }}
                  >
                    2
                  </Box>
                  Sua Missão
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Por que você quer participar do projeto?"
                  placeholder="Conta pra gente!"
                  sx={{ mb: 3 }}
                  {...register("motivation")}
                  error={!!errors.motivation}
                  helperText={errors.motivation?.message as string}
                />

                <Box
                  sx={{
                    bgcolor: "#f5f5f5",
                    p: 2,
                    borderRadius: 2,
                    mb: hasExperience ? 2 : 0,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={(e) =>
                          setValue("hasExperience", e.target.checked)
                        }
                      />
                    }
                    label="Já tive contato com robótica ou programação antes"
                  />
                </Box>

                {hasExperience && (
                  <TextField
                    fullWidth
                    label="Conte um pouco do que sabe:"
                    placeholder="Ex: Usei Scratch, montei robôs..."
                    sx={{ mt: 2 }}
                    {...register("experienceDetails")}
                    error={!!errors.experienceDetails}
                    helperText={errors.experienceDetails?.message as string}
                  />
                )}
              </Box>

              {/* 4. TERMOS E CONDIÇÕES */}
              <Box
                sx={{
                  mb: 5,
                  p: 3,
                  bgcolor: "rgba(149, 106, 217, 0.05)",
                  borderRadius: 3,
                  border: "1px solid rgba(149, 106, 217, 0.2)",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                  sx={{ mb: 3 }}
                >
                  Termos e Compromissos
                </Typography>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      href="/termo_menor.pdf"
                      download
                      sx={{ borderRadius: 2, py: 1.5 }}
                    >
                      Baixar Termo (Menor)
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="inherit"
                      startIcon={<DownloadIcon />}
                      href="/termo_maior.pdf"
                      download
                      sx={{ borderRadius: 2, py: 1.5 }}
                    >
                      Baixar Termo (Maior)
                    </Button>
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <FormControlLabel
                    control={<Checkbox {...register("termAcknowledgment")} />}
                    label="Estou ciente que preciso entregar o termo assinado à mão."
                  />
                  {errors.termAcknowledgment && (
                    <Typography color="error" variant="caption">
                      {errors.termAcknowledgment.message as string}
                    </Typography>
                  )}

                  <FormControlLabel
                    control={<Checkbox {...register("availableHours")} />}
                    label="Tenho disponibilidade no horário do projeto (11:20 às 12:10)."
                  />
                  {errors.availableHours && (
                    <Typography color="error" variant="caption">
                      {errors.availableHours.message as string}
                    </Typography>
                  )}

                  <FormControlLabel
                    control={<Checkbox {...register("commitmentAgreement")} />}
                    label="Concordo com a exigência de 80% de presença."
                  />
                  {errors.commitmentAgreement && (
                    <Typography color="error" variant="caption">
                      {errors.commitmentAgreement.message as string}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* ERROS DO SERVIDOR */}
              {state?.message && !state.success && (
                <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
                  {state.message}
                </Alert>
              )}

              {/* BOTÃO SUBMIT */}
              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                fullWidth
                sx={{
                  py: 2,
                  fontSize: "1.2rem",
                  fontWeight: "900",
                  bgcolor: "#059975",
                  borderRadius: 3,
                  "&:hover": { bgcolor: "#047a5d" },
                }}
              >
                {isPending
                  ? "Enviando Missão..."
                  : "🚀 Confirmar Minha Inscrição"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* REDES SOCIAIS FOOTER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            mt: 6,
          }}
        >
          <Button
            variant="contained"
            component="a"
            href="https://www.instagram.com/projeton.tesla/"
            target="_blank"
            startIcon={<InstagramIcon />}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              borderRadius: 8,
            }}
          >
            Projeto Tesla
          </Button>
          <Button
            variant="contained"
            component="a"
            href="https://wa.me/558486662321"
            target="_blank"
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              borderRadius: 8,
            }}
          >
            Coordenação
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
