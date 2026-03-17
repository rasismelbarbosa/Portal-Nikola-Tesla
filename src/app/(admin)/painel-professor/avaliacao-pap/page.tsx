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
} from "@mui/material";
import { createClient } from "@/utils/supabase/client";
import { registarAvaliacaoPap } from "./actions";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

export default function AvaliacaoPapPage() {
  const supabase = createClient();
  const [alunos, setAlunos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  const [formulario, setFormulario] = useState({
    aluno_id: "",
    missao_nome: "Missão 1: Portfólio de Ideias",
    torrance_fluidez: 0,
    torrance_flexibilidade: 0,
    torrance_originalidade: 0,
    torrance_elaboracao: 0,
  });

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
        texto: "Selecione um inventor para avaliar o portfólio.",
      });
      return;
    }

    setEnviando(true);
    setMensagem({ tipo: "", texto: "" });

    const resposta = await registarAvaliacaoPap(formulario);

    if (resposta.sucesso) {
      setMensagem({
        tipo: "success",
        texto: `Portfólio Avaliado! Nota Final: ${resposta.nota_final} | XP Gerado: +${resposta.xpGanho} XP.`,
      });
      setFormulario({
        ...formulario,
        torrance_fluidez: 0,
        torrance_flexibilidade: 0,
        torrance_originalidade: 0,
        torrance_elaboracao: 0,
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
          <EmojiObjectsIcon sx={{ color: "#956AD9", fontSize: 40 }} />
          <Typography variant="h4" fontWeight="900" color="white">
            Avaliação PAP-PC (Criatividade)
          </Typography>
        </Box>

        <Card
          sx={{
            bgcolor: "rgba(255,255,255,0.03)",
            borderRadius: 4,
            border: "1px solid rgba(149, 106, 217, 0.3)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {carregando ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress sx={{ color: "#956AD9" }} />
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
                        borderColor: "rgba(149, 106, 217, 0.5)",
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
                  label="Nome da Missão / Projeto"
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
                      "& fieldset": { borderColor: "rgba(149, 106, 217, 0.5)" },
                    },
                  }}
                />

                <Typography
                  variant="h6"
                  color="white"
                  sx={{
                    mb: 3,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    pb: 1,
                  }}
                >
                  Indicadores de Torrance (Notas de 0 a 10)
                </Typography>

                {/* CAMPOS EMPILHADOS A OCUPAR 100% DA LARGURA */}
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
                    label="Fluidez (Quantidade de Ideias Geradas)"
                    value={
                      formulario.torrance_fluidez === 0
                        ? ""
                        : formulario.torrance_fluidez
                    }
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        torrance_fluidez: Number(e.target.value),
                      })
                    }
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    sx={{
                      input: {
                        color: "#00d4ff",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      },
                      label: { color: "rgba(255,255,255,0.7)" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(0, 212, 255, 0.3)" },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    type="number"
                    label="Flexibilidade (Variedade e Mudança de Perspetiva)"
                    value={
                      formulario.torrance_flexibilidade === 0
                        ? ""
                        : formulario.torrance_flexibilidade
                    }
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        torrance_flexibilidade: Number(e.target.value),
                      })
                    }
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
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
                    label="Originalidade (Ideias Únicas e Fora do Comum)"
                    value={
                      formulario.torrance_originalidade === 0
                        ? ""
                        : formulario.torrance_originalidade
                    }
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        torrance_originalidade: Number(e.target.value),
                      })
                    }
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
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
                    label="Elaboração (Nível de Detalhe e Acabamento)"
                    value={
                      formulario.torrance_elaboracao === 0
                        ? ""
                        : formulario.torrance_elaboracao
                    }
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        torrance_elaboracao: Number(e.target.value),
                      })
                    }
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
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
                    bgcolor: "#956AD9",
                    color: "white",
                    fontWeight: "900",
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    "&:hover": { bgcolor: "#7a52b3" },
                  }}
                >
                  {enviando
                    ? "A PROCESSAR..."
                    : "AVALIAR PORTFÓLIO E ATRIBUIR XP"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
