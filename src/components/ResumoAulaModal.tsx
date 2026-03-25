"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReactMarkdown from "react-markdown"; // O nosso novo tradutor!

interface ResumoAulaModalProps {
  open: boolean;
  onClose: () => void;
  aula: any;
}

// Função blindada contra a "Viagem no Tempo" dos fusos horários
const formatarDataLocal = (dataString: string) => {
  if (!dataString) return "";
  const partes = dataString.split("T")[0].split("-"); // Separa YYYY, MM, DD
  if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
  return dataString;
};

export default function ResumoAulaModal({
  open,
  onClose,
  aula,
}: ResumoAulaModalProps) {
  if (!aula) return null;

  const dataFormatada = formatarDataLocal(aula.data_aula);
  const stats = aula.stats || {
    presentes: 0,
    faltas: 0,
    total: 0,
    porcentagem: 0,
  };

  const renderTextoSessao = (titulo: string, texto: string) => {
    if (!texto) return null;
    return (
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: "#956AD9",
            fontWeight: "bold",
            mb: 1,
            textTransform: "uppercase",
          }}
        >
          {titulo}
        </Typography>
        {/* Usamos uma Box para envolver o ReactMarkdown e dar estilo às listas e negritos */}
        <Box
          sx={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            "& p": { mb: 1, mt: 0 },
            "& ul, & ol": { pl: 3, mb: 1, mt: 0 },
            "& strong": { color: "white" },
          }}
        >
          <ReactMarkdown>{texto}</ReactMarkdown>
        </Box>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
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
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
            {aula.tema}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Chip
              icon={<CalendarTodayIcon />}
              label={dataFormatada}
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
            />
            <Chip
              label={aula.turma}
              size="small"
              sx={{ bgcolor: "rgba(255, 247, 0, 0.1)", color: "#FFF700" }}
            />
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "rgba(255,255,255,0.5)" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                bgcolor: "rgba(0,0,0,0.3)",
                p: 2,
                borderRadius: 2,
                mb: 3,
                border: "1px solid rgba(255,255,255,0.05)",
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
                <PeopleAltIcon fontSize="small" /> ESTATÍSTICAS DE FREQUÊNCIA
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Adesão Geral:</Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color={stats.porcentagem >= 75 ? "#2F9E41" : "#CD191E"}
                >
                  {stats.porcentagem}%
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  Presentes / Justificados:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="#2F9E41">
                  {stats.presentes}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  Faltas:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="#CD191E">
                  {stats.faltas}
                </Typography>
              </Box>
              <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }} />
              <Typography variant="caption" color="rgba(255,255,255,0.4)">
                Total de alunos registrados: {stats.total}
              </Typography>
            </Box>

            <Box sx={{ bgcolor: "rgba(0,0,0,0.2)", p: 2, borderRadius: 2 }}>
              {renderTextoSessao("Proposta", aula.proposta)}
              {renderTextoSessao("Objetivos", aula.objetivos)}
              {renderTextoSessao("Competências", aula.competencias)}
              {renderTextoSessao("Produto Final / Atividade", aula.atividade)}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                bgcolor: "rgba(0,0,0,0.2)",
                p: 3,
                borderRadius: 2,
                height: "100%",
              }}
            >
              {renderTextoSessao("Cronologia da Aula", aula.cronologia)}
              <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />
              {renderTextoSessao("Dinâmicas / Metodologia", aula.dinamicas)}
              <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />
              {renderTextoSessao("Referências / Links", aula.referencias)}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
