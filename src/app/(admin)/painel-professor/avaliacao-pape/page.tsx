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
} from "@mui/material";
import { createClient } from "@/utils/supabase/client";
import { registarAvaliacaoPape } from "./actions";
import FactCheckIcon from "@mui/icons-material/FactCheck";

export default function AvaliacaoPapePage() {
  const supabase = createClient();
  const [alunos, setAlunos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  const [formulario, setFormulario] = useState({
    aluno_id: "",
    missao_nome: "Missão 1: Introdução à Base",
    nota_seguranca: 0,
    nota_tecnica: 0,
    nota_cidadania: 0,
  });

  // Busca todos os alunos para preencher a lista de seleção
  useEffect(() => {
    async function carregarAlunos() {
      const { data } = await supabase
        .from("alunos")
        .select("id, nome, turma")
        .order("nome");
      if (data) setAlunos(data);
      setCarregando(false);
    }
    carregarAlunos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enviarAvaliacao = async () => {
    if (!formulario.aluno_id) {
      setMensagem({
        tipo: "error",
        texto: "Selecione um inventor para avaliar.",
      });
      return;
    }

    setEnviando(true);
    setMensagem({ tipo: "", texto: "" });

    const resposta = await registarAvaliacaoPape(formulario);

    if (resposta.sucesso) {
      setMensagem({
        tipo: "success",
        texto: `Avaliação concluída! Nota Final: ${resposta.nota_final} | XP Gerado: +${resposta.xpGanho} XP.`,
      });
      // Limpa as notas para o próximo aluno
      setFormulario({
        ...formulario,
        nota_seguranca: 0,
        nota_tecnica: 0,
        nota_cidadania: 0,
      });
    } else {
      setMensagem({
        tipo: "error",
        texto: resposta.erro || "Erro ao avaliar.",
      });
    }
    setEnviando(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 5 } }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <FactCheckIcon sx={{ color: "#059975", fontSize: 40 }} />
          <Typography variant="h4" fontWeight="900" color="white">
            Avaliação PAPE
          </Typography>
        </Box>

        <Card
          sx={{
            bgcolor: "rgba(255,255,255,0.03)",
            borderRadius: 4,
            border: "1px solid rgba(5, 153, 117, 0.3)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {carregando ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress sx={{ color: "#059975" }} />
              </Box>
            ) : (
              <>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Selecione o Inventor
                  </InputLabel>
                  <Select
                    value={formulario.aluno_id}
                    label="Selecione o Inventor"
                    onChange={(e) =>
                      setFormulario({ ...formulario, aluno_id: e.target.value })
                    }
                    sx={{
                      color: "white",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(5, 153, 117, 0.5)",
                      },
                    }}
                  >
                    {alunos.map((aluno) => (
                      <MenuItem key={aluno.id} value={aluno.id}>
                        {aluno.nome} - {aluno.turma}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Nome da Missão"
                  value={formulario.missao_nome}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      missao_nome: e.target.value,
                    })
                  }
                  sx={{
                    mb: 4,
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.5)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(5, 153, 117, 0.5)" },
                    },
                  }}
                />

                <Typography
                  variant="h6"
                  color="white"
                  sx={{
                    mb: 2,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    pb: 1,
                  }}
                >
                  Critérios de Avaliação
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mb: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    type="number"
                    label="Segurança e Organização (0 a 2.0)"
                    value={
                      formulario.nota_seguranca === 0
                        ? ""
                        : formulario.nota_seguranca
                    }
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        nota_seguranca: Number(e.target.value),
                      })
                    }
                    InputProps={{ inputProps: { min: 0, max: 2, step: "0.1" } }}
                    sx={{
                      input: {
                        color: "#FFF700",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      },
                      label: { color: "rgba(255,255,255,0.7)" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(255, 247, 0, 0.3)" },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    type="number"
                    label="Habilidade Técnica e Execução (0 a 5.0)"
                    value={
                      formulario.nota_tecnica === 0
                        ? ""
                        : formulario.nota_tecnica
                    }
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        nota_tecnica: Number(e.target.value),
                      })
                    }
                    InputProps={{ inputProps: { min: 0, max: 5, step: "0.1" } }}
                    sx={{
                      input: {
                        color: "#059975",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      },
                      label: { color: "rgba(255,255,255,0.7)" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(5, 153, 117, 0.3)" },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    type="number"
                    label="Engajamento e Cidadania (0 a 3.0)"
                    value={
                      formulario.nota_cidadania === 0
                        ? ""
                        : formulario.nota_cidadania
                    }
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        nota_cidadania: Number(e.target.value),
                      })
                    }
                    InputProps={{ inputProps: { min: 0, max: 3, step: "0.1" } }}
                    sx={{
                      input: {
                        color: "#956AD9",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      },
                      label: { color: "rgba(255,255,255,0.7)" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(149, 106, 217, 0.3)",
                        },
                      },
                    }}
                  />
                </Box>

                {mensagem.texto && (
                  <Alert
                    severity={mensagem.tipo as any}
                    sx={{ mb: 3, borderRadius: 2 }}
                  >
                    {mensagem.texto}
                  </Alert>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  onClick={enviarAvaliacao}
                  disabled={enviando}
                  sx={{
                    py: 2,
                    bgcolor: "#059975",
                    color: "white",
                    fontWeight: "900",
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    "&:hover": { bgcolor: "#037a5d" },
                  }}
                >
                  {enviando
                    ? "A PROCESSAR..."
                    : "GRAVAR AVALIAÇÃO E ATRIBUIR XP"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
