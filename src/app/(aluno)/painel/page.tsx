"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Avatar,
  Chip,
  CircularProgress,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

// Ícones
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ForumIcon from "@mui/icons-material/Forum";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export default function PainelAluno() {
  const supabase = createClient();
  const [aluno, setAluno] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalSenha, setModalSenha] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [statusSenha, setStatusSenha] = useState({ tipo: "", texto: "" });
  const [carregandoSenha, setCarregandoSenha] = useState(false);

  // Função para atualizar a senha no banco
  const handleTrocarSenha = async () => {
    if (novaSenha.length < 6) {
      setStatusSenha({
        tipo: "error",
        texto: "A palavra-passe deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    setCarregandoSenha(true);
    setStatusSenha({ tipo: "", texto: "" });

    const { error } = await supabase.auth.updateUser({ password: novaSenha });

    if (error) {
      setStatusSenha({
        tipo: "error",
        texto: "Erro de comunicação: " + error.message,
      });
    } else {
      setStatusSenha({
        tipo: "success",
        texto: "Código de segurança atualizado!",
      });
      setNovaSenha("");
      setTimeout(() => setModalSenha(false), 2000); // Fecha a janela após 2 segundos
    }
    setCarregandoSenha(false);
  };

  useEffect(() => {
    async function carregarDados() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 1. Perfil e Guilda
        const { data: perfil } = await supabase
          .from("alunos")
          .select(`*, guildas ( nome )`)
          .eq("id", user.id)
          .single();
        if (perfil) setAluno(perfil);

        // 2. Transmissões (Feedbacks)
        const { data: mensagens } = await supabase
          .from("feedbacks")
          .select("*")
          .eq("aluno_id", user.id)
          .order("created_at", { ascending: false });
        if (mensagens) setFeedbacks(mensagens);

        // 3. Avaliações PAPE (Prática)
        const { data: pape } = await supabase
          .from("avaliacoes_pape")
          .select("*")
          .eq("aluno_id", user.id);

        // 4. Avaliações PAP-PC (Portfólio/Criatividade)
        const { data: pap } = await supabase
          .from("avaliacoes_pap_pc")
          .select("*")
          .eq("aluno_id", user.id);

        // Junta as duas avaliações, formata e ordena da mais recente para a mais antiga
        const historicoNotas = [];
        if (pape) {
          historicoNotas.push(
            ...pape.map((a) => ({
              ...a,
              tipo: "PAPE (Prática)",
              cor: "#059975",
            })),
          );
        }
        if (pap) {
          historicoNotas.push(
            ...pap.map((a) => ({
              ...a,
              tipo: "PAP-PC (Criatividade)",
              cor: "#956AD9",
            })),
          );
        }

        historicoNotas.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        setAvaliacoes(historicoNotas);
      }
      setCarregando(false);
    }

    carregarDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (carregando) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress sx={{ color: "#956AD9" }} />
      </Box>
    );
  }

  if (!aluno) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography color="error">
          Erro ao carregar o perfil do inventor. Contacte o Comandante.
        </Typography>
      </Box>
    );
  }

  const percentualXP = Math.min(
    (aluno.xp_atual / aluno.xp_proximo_nivel) * 100,
    100,
  );

  return (
    <Box sx={{ backgroundColor: "#0f172a", minHeight: "100vh", pb: 10, pt: 4 }}>
      <Container maxWidth="lg">
        {/* ==========================================
            1. CABEÇALHO DO ALUNO E BARRA DE XP
        ========================================== */}
        <Card
          sx={{
            bgcolor: "rgba(255,255,255,0.03)",
            borderRadius: 4,
            border: "1px solid rgba(149, 106, 217, 0.3)",
            mb: 5,
          }}
        >
          <CardContent sx={{ p: "4%" }}>
            <Grid container spacing={4} alignItems="center">
              <Grid
                size={{ xs: 12, md: 8 }}
                sx={{ display: "flex", alignItems: "center", gap: 3 }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "#956AD9",
                    border: "2px solid #FFF700",
                  }}
                >
                  <Box
                    sx={{ position: "relative", width: "90%", height: "90%" }}
                  >
                    <Image
                      src="/logo-tesla-branco.svg"
                      alt="Logo Tesla"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                </Avatar>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}
                  >
                    Bem-vindo de volta,
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="900"
                    color="white"
                    sx={{ mb: 1 }}
                  >
                    {aluno.nome}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      icon={<MilitaryTechIcon />}
                      label={`Nível: ${aluno.nivel}`}
                      sx={{
                        bgcolor: "#FFF700",
                        color: "#0a0a0a",
                        fontWeight: "bold",
                      }}
                    />
                    <Chip
                      label={
                        aluno.guildas?.nome
                          ? `Guilda: ${aluno.guildas.nome}`
                          : "Sem Guilda"
                      }
                      variant="outlined"
                      sx={{
                        color: "white",
                        borderColor: "rgba(255,255,255,0.3)",
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    bgcolor: "rgba(0,0,0,0.5)",
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "secondary.main", fontWeight: "bold" }}
                    >
                      Progresso do Nível
                    </Typography>
                    <Typography variant="body2" color="white" fontWeight="bold">
                      {aluno.xp_atual} / {aluno.xp_proximo_nivel} XP
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={percentualXP}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      bgcolor: "rgba(255,255,255,0.1)",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#956AD9",
                        backgroundImage:
                          "linear-gradient(90deg, #956AD9 0%, #FFF700 100%)",
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Button
                variant="outlined"
                onClick={() => setModalSenha(true)}
                startIcon={<VpnKeyIcon />}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  display: { xs: "none", sm: "flex" },
                }}
              >
                Senha
              </Button>
            </Grid>
          </CardContent>
        </Card>

        {/* ==========================================
            2. BOLETIM DE MISSÕES (NOTAS REAIS)
        ========================================== */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <AssignmentTurnedInIcon sx={{ color: "#FFF700", fontSize: 30 }} />
          <Typography variant="h5" fontWeight="bold" color="white">
            Boletim de Missões (Notas)
          </Typography>
        </Box>

        {avaliacoes.length === 0 ? (
          <Card
            sx={{
              bgcolor: "rgba(0,0,0,0.3)",
              borderRadius: 3,
              border: "1px dashed rgba(255,255,255,0.2)",
              mb: 6,
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                Nenhuma missão avaliada até ao momento.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {avaliacoes.map((av, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    bgcolor: "rgba(255,255,255,0.02)",
                    borderRadius: 3,
                    border: `1px solid ${av.cor}40`,
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Chip
                      label={av.tipo}
                      size="small"
                      sx={{
                        bgcolor: `${av.cor}20`,
                        color: av.cor,
                        mb: 2,
                        fontWeight: "bold",
                        border: `1px solid ${av.cor}50`,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="white"
                      fontWeight="bold"
                      sx={{ mb: 1, minHeight: "60px" }}
                    >
                      {av.missao_nome}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        Nota Global:
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight="900"
                        sx={{ color: av.cor }}
                      >
                        {Number(av.nota_final).toFixed(1)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ==========================================
            3. MURAL DE FEEDBACKS (PENDLETON)
        ========================================== */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <ForumIcon sx={{ color: "#00d4ff", fontSize: 30 }} />
          <Typography variant="h5" fontWeight="bold" color="white">
            Transmissões da Torre de Controlo
          </Typography>
        </Box>

        {feedbacks.length === 0 ? (
          <Card
            sx={{
              bgcolor: "rgba(0,0,0,0.3)",
              borderRadius: 3,
              border: "1px dashed rgba(255,255,255,0.2)",
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 5 }}>
              <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                Nenhum relatório recebido ainda.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3} width={"100%"}>
            {feedbacks.map((fb) => (
              <Grid size={{ xs: 12 }} key={fb.id}>
                <Card
                  sx={{
                    bgcolor: "rgba(255,255,255,0.02)",
                    borderRadius: 3,
                    border: "1px solid rgba(0, 212, 255, 0.2)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      color="white"
                      fontWeight="bold"
                      sx={{ mb: 2 }}
                    >
                      {fb.missao_nome}
                    </Typography>

                    <Grid container spacing={3}>
                      {/* Pontos Fortes */}
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                          sx={{
                            bgcolor: "rgba(5, 153, 117, 0.05)",
                            p: 2,
                            borderRadius: 2,
                            borderLeft: "4px solid #059975",
                            height: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <CheckCircleOutlineIcon
                              sx={{ color: "#059975", fontSize: 20 }}
                            />
                            <Typography
                              sx={{ color: "#059975", fontWeight: "bold" }}
                            >
                              Pontos Fortes
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {fb.pontos_fortes}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Plano de Ação */}
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                          sx={{
                            bgcolor: "rgba(255, 247, 0, 0.05)",
                            p: 2,
                            borderRadius: 2,
                            borderLeft: "4px solid #FFF700",
                            height: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <TrendingUpIcon
                              sx={{ color: "#FFF700", fontSize: 20 }}
                            />
                            <Typography
                              sx={{ color: "#FFF700", fontWeight: "bold" }}
                            >
                              Plano de Ação
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {fb.plano_acao}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        Recebido em:{" "}
                        {new Date(fb.created_at).toLocaleDateString("pt-BR")}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ==========================================
            4. MODAL TROCAR SENHA
        ========================================== */}
        <Dialog
          open={modalSenha}
          onClose={() => setModalSenha(false)}
          PaperProps={{
            sx: {
              bgcolor: "#0f172a",
              border: "1px solid rgba(149, 106, 217, 0.5)",
              borderRadius: 3,
              minWidth: { xs: "90vw", sm: "400px" },
            },
          }}
        >
          <DialogTitle
            sx={{
              color: "white",
              fontWeight: "bold",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Atualizar Código de Segurança
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <TextField
              fullWidth
              type="password"
              label="Nova Palavra-passe"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              sx={{
                mt: 2,
                mb: 3,
                input: { color: "white" },
                label: { color: "rgba(255,255,255,0.5)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(149, 106, 217, 0.5)" },
                },
              }}
            />
            {statusSenha.texto && (
              <Alert
                severity={statusSenha.tipo as any}
                sx={{ borderRadius: 2 }}
              >
                {statusSenha.texto}
              </Alert>
            )}
          </DialogContent>
          <DialogActions
            sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Button
              onClick={() => setModalSenha(false)}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleTrocarSenha}
              variant="contained"
              disabled={carregandoSenha}
              sx={{
                bgcolor: "#956AD9",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#7a52b3" },
              }}
            >
              {carregandoSenha ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Confirmar"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
