"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import { createClient } from "@/utils/supabase/client";
import { criarGuilda, vincularAlunoGuilda } from "./actions";
import GroupIcon from "@mui/icons-material/Group";
import ShieldIcon from "@mui/icons-material/Shield";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function GestaoGuildasPage() {
  const supabase = createClient();
  const [alunos, setAlunos] = useState<any[]>([]);
  const [guildas, setGuildas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  // Formulários
  const [formGuilda, setFormGuilda] = useState({ nome: "", descricao: "" });
  const [formVinculo, setFormVinculo] = useState({
    aluno_id: "",
    guilda_id: "",
  });

  // Função para carregar os dados atualizados
  const carregarDados = async () => {
    setCarregando(true);

    // Busca Guildas e os alunos que estão dentro delas
    const { data: dadosGuildas } = await supabase
      .from("guildas")
      .select("*, alunos(id, nome)")
      .order("nome");
    if (dadosGuildas) setGuildas(dadosGuildas);

    // Busca todos os Alunos
    const { data: dadosAlunos } = await supabase
      .from("alunos")
      .select("id, nome, guilda_id, turma")
      .order("nome");
    if (dadosAlunos) setAlunos(dadosAlunos);

    setCarregando(false);
  };

  useEffect(() => {
    carregarDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCriarGuilda = async () => {
    if (!formGuilda.nome) return;
    const resposta = await criarGuilda(formGuilda);
    if (resposta.sucesso) {
      setMensagem({
        tipo: "success",
        texto: `Guilda "${formGuilda.nome}" forjada com sucesso!`,
      });
      setFormGuilda({ nome: "", descricao: "" });
      carregarDados(); // Atualiza a lista
    } else {
      setMensagem({
        tipo: "error",
        texto: resposta.erro || "Erro ao criar Guilda.",
      });
    }
  };

  const handleVincularAluno = async () => {
    if (!formVinculo.aluno_id || !formVinculo.guilda_id) return;
    const resposta = await vincularAlunoGuilda(
      formVinculo.aluno_id,
      formVinculo.guilda_id,
    );
    if (resposta.sucesso) {
      setMensagem({
        tipo: "success",
        texto: "Inventor recrutado para a Guilda com sucesso!",
      });
      setFormVinculo({ aluno_id: "", guilda_id: "" });
      carregarDados(); // Atualiza a lista
    } else {
      setMensagem({
        tipo: "error",
        texto: resposta.erro || "Erro ao vincular.",
      });
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 5 } }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <GroupIcon sx={{ color: "#956AD9", fontSize: 40 }} />
          <Typography variant="h4" fontWeight="900" color="white">
            Gestão de Guildas
          </Typography>
        </Box>

        {mensagem.texto && (
          <Alert
            severity={mensagem.tipo as any}
            sx={{ mb: 4, borderRadius: 2 }}
          >
            {mensagem.texto}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* ==========================================
              1. FORJAR NOVA GUILDA
          ========================================== */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.03)",
                borderRadius: 4,
                border: "1px solid rgba(149, 106, 217, 0.3)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <ShieldIcon sx={{ color: "#956AD9" }} />
                  <Typography variant="h6" color="white" fontWeight="bold">
                    Forjar Nova Guilda
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  label="Nome da Guilda (Ex: Esquadrão Faraday)"
                  value={formGuilda.nome}
                  onChange={(e) =>
                    setFormGuilda({ ...formGuilda, nome: e.target.value })
                  }
                  sx={{
                    mb: 3,
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.5)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(149, 106, 217, 0.5)" },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Lema / Descrição (Opcional)"
                  value={formGuilda.descricao}
                  onChange={(e) =>
                    setFormGuilda({ ...formGuilda, descricao: e.target.value })
                  }
                  sx={{
                    mb: 3,
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.5)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(149, 106, 217, 0.5)" },
                    },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCriarGuilda}
                  disabled={!formGuilda.nome}
                  sx={{
                    py: 1.5,
                    bgcolor: "#956AD9",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 2,
                    "&:hover": { bgcolor: "#7a52b3" },
                  }}
                >
                  CRIAR GUILDA
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* ==========================================
              2. RECRUTAR INVENTORES
          ========================================== */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.03)",
                borderRadius: 4,
                border: "1px solid rgba(5, 153, 117, 0.3)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <PersonAddIcon sx={{ color: "#059975" }} />
                  <Typography variant="h6" color="white" fontWeight="bold">
                    Recrutar para a Guilda
                  </Typography>
                </Box>

                {carregando ? (
                  <CircularProgress sx={{ color: "#059975" }} />
                ) : (
                  <>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Selecione o Inventor
                      </InputLabel>
                      <Select
                        value={formVinculo.aluno_id}
                        onChange={(e) =>
                          setFormVinculo({
                            ...formVinculo,
                            aluno_id: e.target.value,
                          })
                        }
                        label="Selecione o Inventor"
                        sx={{
                          color: "white",
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(5, 153, 117, 0.5)",
                          },
                        }}
                      >
                        {alunos.map((aluno) => (
                          <MenuItem key={aluno.id} value={aluno.id}>
                            {aluno.nome} -{" "}
                            {aluno.guilda_id
                              ? "(Já tem Guilda)"
                              : "(Sem Guilda)"}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Selecione a Guilda
                      </InputLabel>
                      <Select
                        value={formVinculo.guilda_id}
                        onChange={(e) =>
                          setFormVinculo({
                            ...formVinculo,
                            guilda_id: e.target.value,
                          })
                        }
                        label="Selecione a Guilda"
                        sx={{
                          color: "white",
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(5, 153, 117, 0.5)",
                          },
                        }}
                      >
                        {guildas.map((guilda) => (
                          <MenuItem key={guilda.id} value={guilda.id}>
                            {guilda.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleVincularAluno}
                      disabled={!formVinculo.aluno_id || !formVinculo.guilda_id}
                      sx={{
                        py: 1.5,
                        bgcolor: "#059975",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: 2,
                        "&:hover": { bgcolor: "#037a5d" },
                      }}
                    >
                      VINCULAR INVENTOR
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* ==========================================
              3. VISÃO GERAL DAS GUILDAS
          ========================================== */}
          <Grid item xs={12}>
            <Typography
              variant="h5"
              color="white"
              fontWeight="bold"
              sx={{
                mt: 4,
                mb: 3,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                pb: 1,
              }}
            >
              Guildas Ativas no Sistema
            </Typography>

            <Grid container spacing={3}>
              {guildas.length === 0 ? (
                <Grid item xs={12}>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                    Nenhuma Guilda forjada ainda.
                  </Typography>
                </Grid>
              ) : (
                guildas.map((guilda) => (
                  <Grid item xs={12} md={4} key={guilda.id}>
                    <Card
                      sx={{
                        bgcolor: "rgba(0,0,0,0.4)",
                        borderRadius: 3,
                        border: "1px solid rgba(255, 247, 0, 0.3)",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          color="#FFF700"
                          fontWeight="bold"
                        >
                          {guilda.nome}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            mb: 2,
                            minHeight: "40px",
                          }}
                        >
                          {guilda.descricao || "Sem lema definido."}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            color: "#059975",
                            fontWeight: "bold",
                            display: "block",
                            mb: 1,
                          }}
                        >
                          Inventores Recrutados ({guilda.alunos?.length || 0}):
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {guilda.alunos && guilda.alunos.length > 0 ? (
                            guilda.alunos.map((a: any) => (
                              <Chip
                                key={a.id}
                                label={a.nome}
                                size="small"
                                sx={{
                                  bgcolor: "rgba(255,255,255,0.1)",
                                  color: "white",
                                }}
                              />
                            ))
                          ) : (
                            <Typography
                              variant="caption"
                              sx={{ color: "rgba(255,255,255,0.3)" }}
                            >
                              Guilda vazia.
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
