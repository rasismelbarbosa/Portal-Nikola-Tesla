"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Image from "next/image";

// Ícones
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CancelIcon from "@mui/icons-material/Cancel";

// 🟢 1. A NOVA IMPORTAÇÃO INTELIGENTE DO SUPABASE:
import { createClient } from "@/utils/supabase/client";
import { aprovarCandidato, rejeitarCandidato } from "./actions";

export default function PainelProfessor() {
  // 🟢 2. INICIALIZAÇÃO DENTRO DO COMPONENTE (Pega o seu login automaticamente)
  const supabase = createClient();

  // Estados para guardar os dados da base de dados
  const [inscricoes, setInscricoes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  // Estados do Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState<any>(null);

  const abrirModal = (inscricao: any) => {
    setCandidatoSelecionado(inscricao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCandidatoSelecionado(null);
  };

  const handleAprovar = async (id: string, nome: string) => {
    if (
      !confirm(
        `Tem a certeza que deseja aprovar o aluno ${nome} e gerar o seu acesso?`,
      )
    )
      return;

    setCarregando(true);
    const resposta = await aprovarCandidato(id);

    if (resposta.sucesso) {
      alert(
        `✅ Aluno ${nome} aprovado com sucesso!\nA palavra-passe de acesso dele é: ${resposta.senha}`,
      );
      // Remove a inscrição da tabela visualmente
      setInscricoes(inscricoes.filter((inscricao) => inscricao.id !== id));
    } else {
      alert(`❌ Erro: ${resposta.erro}`);
    }
    setCarregando(false);
  };

  const handleRejeitar = async () => {
    if (!candidatoSelecionado) return;
    if (
      !confirm(
        `Tem a certeza que deseja REJEITAR a inscrição de ${candidatoSelecionado.full_name}?`,
      )
    )
      return;

    setCarregando(true);
    const resposta = await rejeitarCandidato(candidatoSelecionado.id);

    if (resposta.sucesso) {
      alert(
        `Inscrição de ${candidatoSelecionado.full_name} rejeitada e removida.`,
      );
      setInscricoes(
        inscricoes.filter(
          (inscricao) => inscricao.id !== candidatoSelecionado.id,
        ),
      );
      fecharModal();
    } else {
      alert(`❌ Erro: ${resposta.erro}`);
    }
    setCarregando(false);
  };

  // A função que vai buscar os dados assim que a página abre
  useEffect(() => {
    async function carregarInscricoes() {
      // Como o 'supabase' agora é o inteligente, ele manda o seu cookie de Admin junto!
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar inscrições:", error);
      } else if (data) {
        setInscricoes(data);
      }
      setCarregando(false);
    }

    carregarInscricoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ backgroundColor: "#0f172a", minHeight: "100vh", pb: 10 }}>
      {/* ==========================================
          1. CABEÇALHO DO COMANDANTE
      ========================================== */}
      <Box
        sx={{
          bgcolor: "rgba(0,0,0,0.3)",
          borderBottom: "1px solid rgba(149, 106, 217, 0.3)",
          pt: 6,
          pb: 4,
          px: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                <Box sx={{ position: "relative", width: 45, height: 45 }}>
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
                  sx={{
                    color: "secondary.main",
                    fontWeight: "bold",
                    letterSpacing: 2,
                  }}
                >
                  Acesso Nível Máximo
                </Typography>
                <Typography variant="h4" fontWeight="900" color="white">
                  Torre de Controlo: Tesla
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* MODAL DE DETALHES DO CANDIDATO */}
          <Dialog
            open={modalAberto}
            onClose={fecharModal}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                bgcolor: "#0f172a",
                border: "1px solid rgba(149, 106, 217, 0.5)",
                borderRadius: 3,
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
              Ficha do Inventor
            </DialogTitle>
            <DialogContent sx={{ py: 3 }}>
              {candidatoSelecionado && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    <strong>Nome:</strong>{" "}
                    <span style={{ color: "white" }}>
                      {candidatoSelecionado.full_name}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    <strong>E-mail:</strong>{" "}
                    <span style={{ color: "white" }}>
                      {candidatoSelecionado.email}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    <strong>WhatsApp:</strong>{" "}
                    <span style={{ color: "white" }}>
                      {candidatoSelecionado.whatsapp}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    <strong>Motivação:</strong>{" "}
                    <span style={{ color: "white" }}>
                      {candidatoSelecionado.motivation}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    <strong>Nascimento:</strong>{" "}
                    <span style={{ color: "white" }}>
                      {candidatoSelecionado.birth_date}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    <strong>Turma:</strong>{" "}
                    <span style={{ color: "white" }}>
                      {candidatoSelecionado.student_class}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    <strong>Experiência em Robótica:</strong>{" "}
                    <span
                      style={{
                        color: candidatoSelecionado.has_robotics_experience
                          ? "#059975"
                          : "#FFF700",
                      }}
                    >
                      {candidatoSelecionado.has_robotics_experience
                        ? "Sim"
                        : "Não"}
                    </span>
                  </Typography>
                  {candidatoSelecionado.has_robotics_espirience && (
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      <strong>Experiência:</strong>{" "}
                      <span style={{ color: "white" }}>
                        {candidatoSelecionado.experience_details}
                      </span>
                    </Typography>
                  )}

                  {candidatoSelecionado.guardian_name && (
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      <strong>Nome do Responsável:</strong>{" "}
                      <span style={{ color: "white" }}>
                        {candidatoSelecionado.guardian_name}
                      </span>
                    </Typography>
                  )}
                  {candidatoSelecionado.guardian_phone && (
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                      <strong>Telefone do Responsável:</strong>{" "}
                      <span style={{ color: "white" }}>
                        {candidatoSelecionado.guardian_phone}
                      </span>
                    </Typography>
                  )}

                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    <strong>Data de Inscrição:</strong>{" "}
                    <span style={{ color: "white" }}>
                      {new Date(candidatoSelecionado.created_at).toLocaleString(
                        "pt-BR",
                      )}
                    </span>
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions
              sx={{
                p: 3,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={handleRejeitar}
                color="error"
                variant="outlined"
                startIcon={<CancelIcon />}
                sx={{ fontWeight: "bold" }}
              >
                Rejeitar
              </Button>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button onClick={fecharModal} sx={{ color: "white" }}>
                  Fechar
                </Button>
                <Button
                  onClick={() =>
                    handleAprovar(
                      candidatoSelecionado.id,
                      candidatoSelecionado.full_name,
                    )
                  }
                  variant="contained"
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    bgcolor: "#059975",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#037a5d" },
                  }}
                >
                  Aprovar
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {/* ==========================================
            2. CARDS DE MÉTRICAS RÁPIDAS (Dinâmicos)
        ========================================== */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: "rgba(255, 247, 0, 0.1)",
                border: "1px solid rgba(255, 247, 0, 0.3)",
                borderRadius: 3,
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Avatar sx={{ bgcolor: "#FFF700", color: "#000" }}>
                  <AssignmentIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: "#FFF700" }}
                  >
                    {carregando ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      inscricoes.length
                    )}
                  </Typography>
                  <Typography variant="body2" color="white">
                    Inscrições Recebidas
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: "rgba(5, 153, 117, 0.1)",
                border: "1px solid rgba(5, 153, 117, 0.3)",
                borderRadius: 3,
                opacity: 0.5,
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Avatar sx={{ bgcolor: "#059975", color: "white" }}>
                  <GroupIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: "#059975" }}
                  >
                    0
                  </Typography>
                  <Typography variant="body2" color="white">
                    Alunos Ativos (Em Breve)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: "rgba(149, 106, 217, 0.1)",
                border: "1px solid rgba(149, 106, 217, 0.3)",
                borderRadius: 3,
                opacity: 0.5,
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Avatar sx={{ bgcolor: "#956AD9", color: "white" }}>
                  <MilitaryTechIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: "#956AD9" }}
                  >
                    0
                  </Typography>
                  <Typography variant="body2" color="white">
                    Guildas Formadas (Em Breve)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ==========================================
            3. TABELA DE GESTÃO DE INSCRIÇÕES
        ========================================== */}
        <Typography variant="h5" fontWeight="bold" color="white" sx={{ mb: 3 }}>
          Inscrições Pendentes (Avaliação de Termos)
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            bgcolor: "rgba(255,255,255,0.05)",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: "rgba(0,0,0,0.5)" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Nome do Candidato
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Turma
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Contacto
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Experiência
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Data de Inscrição
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Ver Ficha
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {carregando ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <CircularProgress sx={{ color: "primary.main" }} />
                  </TableCell>
                </TableRow>
              ) : inscricoes.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ color: "rgba(255,255,255,0.5)", py: 5 }}
                  >
                    Nenhuma inscrição recebida ainda.
                  </TableCell>
                </TableRow>
              ) : (
                inscricoes.map((inscricao) => (
                  <TableRow
                    key={inscricao.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { bgcolor: "rgba(255,255,255,0.02)" },
                    }}
                  >
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {inscricao.full_name}
                    </TableCell>

                    <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                      <Chip
                        label={inscricao.student_class}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.1)",
                          color: "white",
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        component="a"
                        href={`https://wa.me/55${inscricao.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        size="small"
                        startIcon={<WhatsAppIcon />}
                        sx={{ color: "#059975", textTransform: "none" }}
                      >
                        {inscricao.whatsapp}
                      </Button>
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={
                          inscricao.has_robotics_experience ? "Sim" : "Não"
                        }
                        size="small"
                        color={
                          inscricao.has_robotics_experience
                            ? "secondary"
                            : "default"
                        }
                        variant={
                          inscricao.has_robotics_experience
                            ? "filled"
                            : "outlined"
                        }
                        sx={{
                          color: !inscricao.has_robotics_experience
                            ? "white"
                            : "inherit",
                        }}
                      />
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {new Date(inscricao.created_at).toLocaleDateString(
                        "pt-BR",
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        title="Ver Ficha do Candidato"
                        onClick={() => abrirModal(inscricao)}
                        sx={{
                          color: "#00d4ff",
                          border: "1px solid rgba(0, 212, 255, 0.3)",
                          borderRadius: 2,
                          "&:hover": { bgcolor: "rgba(0, 212, 255, 0.1)" },
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
