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
