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
import { registarFeedback } from "./actions";
import ForumIcon from "@mui/icons-material/Forum"; // Ícone de chat/feedback

export default function FeedbackPage() {
  const supabase = createClient();
  const [alunos, setAlunos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  const [formulario, setFormulario] = useState({
    aluno_id: "",
    missao_nome: "Missão 1",
    pontos_fortes: "",
    plano_acao: "",
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

  const enviarFeedback = async () => {
    if (
      !formulario.aluno_id ||
      !formulario.pontos_fortes ||
      !formulario.plano_acao
    ) {
      setMensagem({
        tipo: "error",
        texto: "Preencha todos os campos do relatório antes de enviar.",
      });
      return;
    }

    setEnviando(true);
    setMensagem({ tipo: "", texto: "" });

    const resposta = await registarFeedback(formulario);

    if (resposta.sucesso) {
      setMensagem({
        tipo: "success",
        texto: "Feedback enviado com sucesso para a base do inventor!",
      });
      setFormulario({ ...formulario, pontos_fortes: "", plano_acao: "" });
    } else {
      setMensagem({
        tipo: "error",
        texto: resposta.erro || "Erro ao enviar feedback.",
      });
    }
    setEnviando(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 5 } }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <ForumIcon sx={{ color: "#00d4ff", fontSize: 40 }} />
          <Typography variant="h4" fontWeight="900" color="white">
            Feedback Formativo (Pendleton)
          </Typography>
        </Box>

        <Card
          sx={{
            bgcolor: "rgba(255,255,255,0.03)",
            borderRadius: 4,
            border: "1px solid rgba(0, 212, 255, 0.3)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {carregando ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress sx={{ color: "#00d4ff" }} />
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
                        borderColor: "rgba(0, 212, 255, 0.5)",
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
                  label="Nome da Missão / Contexto"
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
                      "& fieldset": { borderColor: "rgba(0, 212, 255, 0.5)" },
                    },
                  }}
                />

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
                    multiline
                    rows={4}
                    label="O que correu bem? (Pontos Fortes)"
                    placeholder="Elogie as atitudes, ideias ou execuções positivas..."
                    value={formulario.pontos_fortes}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        pontos_fortes: e.target.value,
                      })
                    }
                    sx={{
                      "& .MuiInputBase-input": { color: "#059975" }, // Texto verde
                      label: { color: "rgba(255,255,255,0.7)" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(5, 153, 117, 0.3)" },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="O que pode ser melhorado? (Plano de Ação)"
                    placeholder="Diga o que poderia ter sido feito de forma diferente e como melhorar na próxima missão..."
                    value={formulario.plano_acao}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        plano_acao: e.target.value,
                      })
                    }
                    sx={{
                      "& .MuiInputBase-input": { color: "#FFF700" }, // Texto amarelo
                      label: { color: "rgba(255,255,255,0.7)" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(255, 247, 0, 0.3)" },
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
                  onClick={enviarFeedback}
                  disabled={enviando}
                  sx={{
                    py: 2,
                    bgcolor: "#00d4ff",
                    color: "#0a0a0a",
                    fontWeight: "900",
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    "&:hover": { bgcolor: "#00a3cc" },
                  }}
                >
                  {enviando ? "A PROCESSAR..." : "TRANSMITIR FEEDBACK"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
