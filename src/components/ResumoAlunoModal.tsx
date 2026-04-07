"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Divider,
  Chip,
  Grid, // Lembre-se: no MUI v6 usamos 'size' em vez de 'item xs'
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TimelineIcon from "@mui/icons-material/Timeline";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

// Definindo o que o Modal espera receber
interface ResumoAlunoModalProps {
  open: boolean;
  onClose: () => void;
  aluno: any; // Depois podemos tipar isso melhor com os dados do Supabase
}

export default function ResumoAlunoModal({
  open,
  onClose,
  aluno,
}: ResumoAlunoModalProps) {
  if (!aluno) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#1e293b",
          color: "white",
          borderRadius: 3,
          border: "1px solid rgba(149, 106, 217, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "#956AD9", width: 50, height: 50 }}>
            {aluno.nome.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {aluno.nome}
            </Typography>
            <Chip
              label={aluno.guilda}
              size="small"
              sx={{
                bgcolor: "rgba(255, 247, 0, 0.2)",
                color: "#FFF700",
                fontWeight: "bold",
                mt: 0.5,
              }}
            />
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "rgba(255,255,255,0.5)" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* BLOCO: DESEMPENHO ACADÊMICO */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                bgcolor: "rgba(0,0,0,0.2)",
                p: 2,
                borderRadius: 2,
                height: "100%",
              }}
            >
              <Typography
                variant="subtitle2"
                color="rgba(255,255,255,0.6)"
                mb={2}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <TimelineIcon fontSize="small" /> DESEMPENHO ACADÊMICO
              </Typography>

              {/* Notas Detalhadas */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  Nota PAPE (Prática):
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {aluno.nota_pape || 0}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  Nota PAP-PC (Portfólio):
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {aluno.nota_pap_pc || 0}
                </Typography>
              </Box>

              <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }} />

              {/* Média Geral */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  alignItems: "center",
                }}
              >
                <Typography>Média Geral:</Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={(aluno.media || 0) >= 6 ? "#2F9E41" : "#CD191E"}
                >
                  {aluno.media || 0} / 10
                </Typography>
              </Box>

              {/* Frequência */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Frequência:</Typography>
                <Typography
                  fontWeight="bold"
                  color={(aluno.frequencia || 0) >= 75 ? "#2F9E41" : "#CD191E"}
                >
                  {aluno.frequencia || 0}%
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* BLOCO: GAMIFICAÇÃO */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                bgcolor: "rgba(0,0,0,0.2)",
                p: 2,
                borderRadius: 2,
                height: "100%",
              }}
            >
              <Typography
                variant="subtitle2"
                color="rgba(255,255,255,0.6)"
                mb={2}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <MilitaryTechIcon fontSize="small" /> STATUS TESLA
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Nível Atual:</Typography>
                <Typography fontWeight="bold" color="#FFF700">
                  Nvl. {aluno.nivel || 1}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>XP Acumulado:</Typography>
                <Typography fontWeight="bold" color="#956AD9">
                  {aluno.xp || 0} XP
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* BLOCO: DOSSIÊ E CONTACTOS */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ bgcolor: "rgba(0,0,0,0.2)", p: 2, borderRadius: 2 }}>
              <Typography
                variant="subtitle2"
                color="rgba(255,255,255,0.6)"
                mb={2}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <ContactPhoneIcon fontSize="small" /> DOSSIÊ DO RECRUTA
              </Typography>

              <Grid container spacing={2}>
                {/* Coluna 1: Contactos */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="rgba(255,255,255,0.5)">
                      WhatsApp do Aluno
                    </Typography>
                    <Typography variant="body2">
                      {aluno.whatsapp || "Não informado"}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="rgba(255,255,255,0.5)">
                      Data de Nascimento
                    </Typography>
                    <Typography variant="body2">
                      {aluno.data_nascimento
                        ? new Date(aluno.data_nascimento).toLocaleDateString(
                            "pt-BR",
                          )
                        : "Não informada"}
                    </Typography>
                  </Box>
                </Grid>

                {/* Coluna 2: Responsável */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="rgba(255,255,255,0.5)">
                      Responsável Legal
                    </Typography>
                    <Typography variant="body2">
                      {aluno.nome_responsavel || "O próprio (Maior de idade)"}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="rgba(255,255,255,0.5)">
                      Telefone do Responsável
                    </Typography>
                    <Typography variant="body2">
                      {aluno.telefone_responsavel || "---"}
                    </Typography>
                  </Box>
                </Grid>

                {/* Coluna 3 (Linha Inteira): Motivação */}
                <Grid size={{ xs: 12 }}>
                  <Divider
                    sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }}
                  />
                  <Typography variant="caption" color="rgba(255,255,255,0.5)">
                    Motivação / Carta de Intenção
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      mt: 0.5,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {aluno.motivacao || "Nenhuma motivação registada na base."}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* BLOCO: ÚLTIMOS FEEDBACKS */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ bgcolor: "rgba(0,0,0,0.2)", p: 2, borderRadius: 2 }}>
              <Typography
                variant="subtitle2"
                color="rgba(255,255,255,0.6)"
                mb={2}
              >
                ÚLTIMOS FEEDBACKS (Transmissões)
              </Typography>
              <Typography
                variant="body2"
                color="rgba(255,255,255,0.5)"
                fontStyle="italic"
              >
                Nenhuma transmissão registada nas últimas semanas.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
