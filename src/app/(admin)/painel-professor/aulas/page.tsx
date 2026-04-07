"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Grid,
  CircularProgress,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { createClient } from "@/utils/supabase/client";
import ResumoAulaModal from "@/components/ResumoAulaModal";
import Link from "next/link";

// 🛡️ O ESCUDO ANTI-FUSO HORÁRIO (Aplicado nos Cartões)
const formatarDataLocal = (dataString: string) => {
  if (!dataString) return "";
  const partes = dataString.split("T")[0].split("-");
  if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
  return dataString;
};

export default function AcervoAulasPage() {
  const supabase = createClient();
  const [aulas, setAulas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [aulaSelecionada, setAulaSelecionada] = useState<any>(null);

  useEffect(() => {
    const buscarAulasEstatisticas = async () => {
      // 1. Busca todas as aulas ordenadas pela mais recente
      const { data: dataAulas, error: erroAulas } = await supabase
        .from("aulas")
        .select("*")
        .order("data_aula", { ascending: false });

      if (erroAulas || !dataAulas) {
        console.error("Erro ao buscar aulas:", erroAulas);
        setCarregando(false);
        return;
      }

      // 2. Busca o histórico completo de chamadas
      const { data: dataFrequencias } = await supabase
        .from("frequencias")
        .select("aula_id, status");

      // 3. O Motor: Cruza as aulas com as frequências para gerar as estatísticas
      const aulasComEstatisticas = dataAulas.map((aula) => {
        const chamadasDestaAula =
          dataFrequencias?.filter((f) => f.aula_id === aula.id) || [];
        const total = chamadasDestaAula.length;

        // Presentes e Justificados contam como presença
        const presentes = chamadasDestaAula.filter(
          (f) => f.status === "Presente" || f.status === "Justificado",
        ).length;
        const faltas = chamadasDestaAula.filter(
          (f) => f.status === "Falta",
        ).length;
        const porcentagem =
          total > 0 ? Math.round((presentes / total) * 100) : 0;

        return {
          ...aula,
          stats: { total, presentes, faltas, porcentagem },
        };
      });

      setAulas(aulasComEstatisticas);
      setCarregando(false);
    };

    buscarAulasEstatisticas();
  }, [supabase]);

  const abrirModal = (aula: any) => {
    setAulaSelecionada(aula);
    setModalOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", pb: 5 }}>
      {/* CABEÇALHO */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { md: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
            Acervo de Aulas
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.6)">
            Histórico completo de todos os planos de aula e estatísticas de
            frequência do Projeto Tesla.
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/painel-professor/aulas/cadastro-aula"
          variant="contained"
          startIcon={<AddBoxIcon />}
          sx={{
            bgcolor: "#956AD9",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#7a52b3" },
          }}
        >
          Cadastrar Aula
        </Button>
      </Box>

      {/* GRELHA DE AULAS */}
      {carregando ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress sx={{ color: "#956AD9" }} />
        </Box>
      ) : aulas.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
            p: 5,
            bgcolor: "rgba(0,0,0,0.2)",
            borderRadius: 3,
          }}
        >
          <Typography color="rgba(255,255,255,0.6)">
            Nenhuma aula registada no diário de bordo ainda.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {aulas.map((aula) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={aula.id}>
              <Card
                sx={{
                  bgcolor: "#1e293b",
                  borderRadius: 3,
                  border: "1px solid rgba(149, 106, 217, 0.2)",
                  height: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 25px rgba(149, 106, 217, 0.2)",
                    borderColor: "#956AD9",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => abrirModal(aula)}
                  sx={{
                    height: "100%",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  {/* Etiqueta de Data (Agora 100% Blindada) e Turma */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      mb: 2,
                    }}
                  >
                    <Chip
                      icon={<CalendarTodayIcon sx={{ fontSize: "1rem" }} />}
                      label={formatarDataLocal(aula.data_aula)}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    />
                    <Chip
                      label={aula.turma}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255, 247, 0, 0.1)",
                        color: "#FFF700",
                      }}
                    />
                  </Box>

                  {/* Tema da Aula */}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="white"
                    sx={{ mb: 1, lineHeight: 1.2 }}
                  >
                    {aula.tema}
                  </Typography>

                  {/* Resumo/Proposta truncada */}
                  <Typography
                    variant="body2"
                    color="rgba(255,255,255,0.5)"
                    sx={{
                      mb: 3,
                      flexGrow: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {aula.proposta || "Sem descrição disponível."}
                  </Typography>

                  <Divider
                    sx={{
                      width: "100%",
                      mb: 2,
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  />

                  {/* Indicador Rápido de Frequência */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      <PeopleAltIcon fontSize="small" />
                      <Typography variant="caption">
                        {aula.stats.total} Alunos
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      sx={{
                        bgcolor:
                          aula.stats.porcentagem >= 75
                            ? "rgba(47, 158, 65, 0.2)"
                            : "rgba(205, 25, 30, 0.2)",
                        color:
                          aula.stats.porcentagem >= 75 ? "#2F9E41" : "#CD191E",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      Adesão: {aula.stats.porcentagem}%
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* MODAL INVISÍVEL */}
      <ResumoAulaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aula={aulaSelecionada}
      />
    </Box>
  );
}
