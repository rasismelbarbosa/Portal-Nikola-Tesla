"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { enviarTermometro } from "./actions";

// As 7 perguntas neuroeducacionais
const perguntas = [
  {
    id: "q1_clareza",
    texto: "Clareza: As instruções das missões foram fáceis de entender?",
  },
  {
    id: "q2_seguranca",
    texto:
      "Segurança: Senti-me à vontade para partilhar ideias sem medo de errar?",
  },
  {
    id: "q3_desafio",
    texto: "Desafio: O nível de dificuldade das missões foi estimulante?",
  },
  {
    id: "q4_recursos",
    texto:
      "Recursos: Tive os materiais e ferramentas necessários para construir os projetos?",
  },
  {
    id: "q5_ambiente",
    texto: "Colaboração: A minha Guilda trabalhou bem em equipa?",
  },
  {
    id: "q6_utilidade",
    texto:
      "Utilidade: Sinto que o que aprendi hoje tem aplicação no mundo real?",
  },
  {
    id: "q7_motivacao",
    texto: "Motivação: Sinto-me entusiasmado para a próxima missão?",
  },
];

export default function TermometroPage() {
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  const [formulario, setFormulario] = useState({
    semana_letiva: "Semana 1",
    q1_clareza: 0,
    q2_seguranca: 0,
    q3_desafio: 0,
    q4_recursos: 0,
    q5_ambiente: 0,
    q6_utilidade: 0,
    q7_motivacao: 0,
    sugestao: "",
  });

  const lidarComNota = (perguntaId: string, nota: number) => {
    setFormulario({ ...formulario, [perguntaId]: nota });
  };

  const enviarRelatorio = async () => {
    // Validação: Verificar se todas as notas foram preenchidas
    const notasPreenchidas = perguntas.every(
      (p) => formulario[p.id as keyof typeof formulario] !== 0,
    );
    if (!notasPreenchidas) {
      setMensagem({
        tipo: "error",
        texto:
          "Atenção, Inventor! Preencha todas as escalas de 1 a 5 antes de transmitir.",
      });
      return;
    }

    setCarregando(true);
    setMensagem({ tipo: "", texto: "" });

    const resposta = await enviarTermometro(formulario);

    if (resposta.sucesso) {
      setMensagem({
        tipo: "success",
        texto:
          "Relatório transmitido com sucesso para a Torre de Controlo! Ganhaste XP de participação.",
      });
      // Limpa as respostas após enviar
      setFormulario({
        ...formulario,
        q1_clareza: 0,
        q2_seguranca: 0,
        q3_desafio: 0,
        q4_recursos: 0,
        q5_ambiente: 0,
        q6_utilidade: 0,
        q7_motivacao: 0,
        sugestao: "",
      });
    } else {
      setMensagem({
        tipo: "error",
        texto: resposta.erro || "Falha na transmissão.",
      });
    }
    setCarregando(false);
  };

  return (
    <Box
      sx={{ backgroundColor: "#0f172a", minHeight: "100vh", pb: 10, pt: "5%" }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <AssessmentIcon sx={{ color: "#FFF700", fontSize: 40 }} />
          <Typography variant="h4" fontWeight="900" color="white">
            Termómetro Semanal
          </Typography>
        </Box>

        <Card
          sx={{
            bgcolor: "rgba(255,255,255,0.03)",
            borderRadius: 4,
            border: "1px solid rgba(149, 106, 217, 0.3)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 5 } }}>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255,255,255,0.7)", mb: 4 }}
            >
              Este é o teu canal direto de comunicação. Classifica cada
              parâmetro de 1 (Discordo Totalmente) a 5 (Concordo Totalmente).
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                Semana da Missão
              </InputLabel>
              <Select
                value={formulario.semana_letiva}
                label="Semana da Missão"
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    semana_letiva: e.target.value,
                  })
                }
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(149, 106, 217, 0.5)",
                  },
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <MenuItem key={num} value={`Semana ${num}`}>
                    Semana {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* GERADOR DAS PERGUNTAS DE 1 A 5 */}
            {perguntas.map((p) => (
              <Box
                key={p.id}
                sx={{
                  mb: 4,
                  p: 2,
                  bgcolor: "rgba(0,0,0,0.3)",
                  borderRadius: 2,
                  borderLeft: "4px solid #956AD9",
                }}
              >
                <Typography sx={{ color: "white", mb: 2, fontWeight: "bold" }}>
                  {p.texto}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5].map((nota) => {
                    const ativo =
                      formulario[p.id as keyof typeof formulario] === nota;
                    return (
                      <Button
                        key={nota}
                        onClick={() => lidarComNota(p.id, nota)}
                        variant={ativo ? "contained" : "outlined"}
                        sx={{
                          minWidth: "45px",
                          bgcolor: ativo ? "#FFF700" : "transparent",
                          color: ativo ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                          borderColor: ativo
                            ? "#FFF700"
                            : "rgba(255,255,255,0.2)",
                          fontWeight: "bold",
                          "&:hover": {
                            bgcolor: ativo
                              ? "#e6df00"
                              : "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        {nota}
                      </Button>
                    );
                  })}
                </Box>
              </Box>
            ))}

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Sugestões para a Torre de Controlo (Opcional)"
              value={formulario.sugestao}
              onChange={(e) =>
                setFormulario({ ...formulario, sugestao: e.target.value })
              }
              sx={{
                mb: 4,
                input: { color: "white" },
                "& .MuiInputBase-input": { color: "white" },
                label: { color: "rgba(255,255,255,0.5)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(149, 106, 217, 0.5)" },
                  "&:hover fieldset": { borderColor: "#FFF700" },
                },
              }}
            />

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
              onClick={enviarRelatorio}
              disabled={carregando}
              startIcon={
                carregando ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
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
              TRANSMITIR RELATÓRIO
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
