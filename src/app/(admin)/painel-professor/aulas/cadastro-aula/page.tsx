"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  CircularProgress,
  MenuItem,
  Alert,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function CadastroAulaPage() {
  const router = useRouter();
  const supabase = createClient();

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const [guildas, setGuildas] = useState<any[]>([]);

  // Função para carregar os dados atualizados
  // const carregarDados = async () => {
  //   setCarregando(true);

  //   // Busca Guildas e os alunos que estão dentro delas
  //   const { data: dadosGuildas } = await supabase
  //     .from("guildas")
  //     .select("nome")
  //     .order("nome");
  //   if (dadosGuildas) setGuildas(dadosGuildas);
  // };

  // useEffect(() => {
  //   carregarDados();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Estado que guarda todos os campos do formulário
  const [formData, setFormData] = useState({
    data_aula: "",
    turma: "",
    tema: "",
    proposta: "",
    objetivos: "",
    competencias: "",
    cronologia: "",
    dinamicas: "",
    referencias: "",
    atividade: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalvarAula = async () => {
    setCarregando(true);
    setMensagem({ tipo: "", texto: "" });

    // Validação simples
    if (!formData.data_aula || !formData.turma || !formData.tema) {
      setMensagem({
        tipo: "error",
        texto: "Por favor, preencha a Data, a Turma e o Tema.",
      });
      setCarregando(false);
      return;
    }

    // Envio para o Supabase
    const { error } = await supabase.from("aulas").insert([formData]);

    if (error) {
      console.error(error);
      setMensagem({
        tipo: "error",
        texto: "Erro ao salvar o plano de aula. Tente novamente.",
      });
    } else {
      setMensagem({
        tipo: "success",
        texto: "Plano de Aula salvo com sucesso! Redirecionando...",
      });
      // Volta para a página de turmas após 2 segundos
      setTimeout(() => {
        router.push("/painel-professor/turmas");
      }, 2000);
    }
    setCarregando(false);
  };

  // Estilo padrão para os inputs escuros ficarem bonitos
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
      "&:hover fieldset": { borderColor: "rgba(149, 106, 217, 0.5)" },
      "&.Mui-focused fieldset": { borderColor: "#956AD9" },
    },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#956AD9" },
    "& .MuiInputBase-input": { color: "white" },
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", pb: 5 }}>
      {/* CABEÇALHO */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Button
          component={Link}
          href="/painel-professor/turmas"
          startIcon={<ArrowBackIcon />}
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          Voltar
        </Button>
        <Typography variant="h4" fontWeight="bold" color="white">
          Novo Plano de Aula
        </Typography>
      </Box>

      {/* FORMULÁRIO */}
      <Paper
        sx={{
          bgcolor: "#1e293b",
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          border: "1px solid rgba(149, 106, 217, 0.2)",
        }}
      >
        {mensagem.texto && (
          <Alert
            severity={mensagem.tipo as any}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            {mensagem.texto}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* LINHA 1 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Data da Aula"
              type="date"
              name="data_aula"
              value={formData.data_aula}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              label="Turma / Guilda"
              name="turma"
              value={formData.turma}
              onChange={handleChange}
              sx={textFieldStyle}
            >
              <MenuItem value="2026">2026</MenuItem>
              {guildas.map((g) => g.nome)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Tema da Aula"
              name="tema"
              value={formData.tema}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          {/* LINHA 2 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Proposta / Resumo"
              name="proposta"
              value={formData.proposta}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Objetivos (Para quê?)"
              name="objetivos"
              value={formData.objetivos}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          {/* LINHA 3 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Competências"
              name="competencias"
              value={formData.competencias}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Atividade / Produto Final"
              name="atividade"
              value={formData.atividade}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          {/* LINHA 4 - MARKDOWNS */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "rgba(255,255,255,0.5)", mb: 1 }}
            >
              💡 Dica: Pode usar formatação (asteriscos, números, etc.) nos
              campos abaixo.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Cronologia da Aula"
              name="cronologia"
              value={formData.cronologia}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Dinâmicas / Metodologia"
              name="dinamicas"
              value={formData.dinamicas}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Referências / Links"
              name="referencias"
              value={formData.referencias}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          {/* BOTÃO DE SALVAR */}
          <Grid
            size={{ xs: 12 }}
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleSalvarAula}
              disabled={carregando}
              startIcon={
                carregando ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SaveIcon />
                )
              }
              sx={{
                bgcolor: "#956AD9",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "#7a52b3" },
              }}
            >
              {carregando ? "Salvando..." : "Salvar Plano de Aula"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
