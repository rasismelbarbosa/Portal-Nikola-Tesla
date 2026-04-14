"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import SaveIcon from "@mui/icons-material/Save";
import { createClient } from "@/utils/supabase/client";

export default function DiarioBordoPage() {
  const supabase = createClient();
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const [form, setForm] = useState({
    data_encontro: new Date().toISOString().split("T")[0],
    numero_encontro: 1,
    duracao_minutos: 50,
    objetivo: "",
    atividades: "",
    resultados: "",
    falhas: "",
  });

  const handleSalvar = async () => {
    setSalvando(true);
    const { error } = await supabase.from("diario_bordo").insert([form]);
    if (!error) {
      setMensagem(
        "Registro científico gravado com sucesso no Diário de Bordo!",
      );
      setForm({
        ...form,
        numero_encontro: form.numero_encontro + 1,
        objetivo: "",
        atividades: "",
        resultados: "",
        falhas: "",
      });
    }
    setSalvando(false);
    setTimeout(() => setMensagem(""), 3000);
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "rgba(0,0,0,0.2)",
      "& fieldset": { borderColor: "rgba(255, 247, 0, 0.3)" },
      "&:hover fieldset": { borderColor: "#FFF700" },
      "&.Mui-focused fieldset": { borderColor: "#FFF700" },
    },
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", pb: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <ScienceIcon sx={{ fontSize: 40, color: "#FFF700" }} />
        <Box>
          <Typography variant="h4" fontWeight="bold" color="white">
            Diário de Bordo
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.6)">
            Registro oficial das sessões e análise de falhas do projeto.
          </Typography>
        </Box>
      </Box>

      {mensagem && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            bgcolor: "rgba(47, 158, 65, 0.2)",
            color: "#2F9E41",
            border: "1px solid #2F9E41",
            borderRadius: 2,
          }}
        >
          {mensagem}
        </Paper>
      )}

      <Paper
        sx={{
          bgcolor: "#1e293b",
          p: 4,
          borderRadius: 3,
          border: "1px solid rgba(255, 247, 0, 0.3)",
        }}
      >
        <Grid container spacing={3}>
          {/* CABEÇALHO DO ENCONTRO */}
          <Grid sx={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="date"
              label="Data"
              value={form.data_encontro}
              onChange={(e) =>
                setForm({ ...form, data_encontro: e.target.value })
              }
              sx={textFieldStyle}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid sx={{ xs: 6, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Encontro Nº"
              value={form.numero_encontro}
              onChange={(e) =>
                setForm({ ...form, numero_encontro: Number(e.target.value) })
              }
              sx={textFieldStyle}
            />
          </Grid>
          <Grid sx={{ xs: 6, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Duração (min)"
              value={form.duracao_minutos}
              onChange={(e) =>
                setForm({ ...form, duracao_minutos: Number(e.target.value) })
              }
              sx={textFieldStyle}
            />
          </Grid>

          <Grid sx={{ xs: 12 }}>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1 }} />
          </Grid>

          {/* DESENVOLVIMENTO (Conforme Documento) */}
          <Grid sx={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Objetivo do Dia"
              placeholder="Ex: Testar o sensor ultrassônico..."
              value={form.objetivo}
              onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid sx={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Descrição das Atividades & Divisão de Tarefas"
              placeholder="Relato do que foi feito e quem fez o quê..."
              value={form.atividades}
              onChange={(e) => setForm({ ...form, atividades: e.target.value })}
              sx={textFieldStyle}
            />
          </Grid>

          {/* RESULTADOS E DESCOBERTAS */}
          <Grid sx={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="O que funcionou? (Resultados)"
              value={form.resultados}
              onChange={(e) => setForm({ ...form, resultados: e.target.value })}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="O que deu errado? (Análise de Falha)"
              placeholder="Fundamental registrar o erro e por que ocorreu..."
              value={form.falhas}
              onChange={(e) => setForm({ ...form, falhas: e.target.value })}
              sx={textFieldStyle}
            />
          </Grid>

          <Grid
            sx={{ xs: 12, mt: 2, display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={handleSalvar}
              disabled={salvando}
              startIcon={
                salvando ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SaveIcon />
                )
              }
              sx={{
                bgcolor: "#FFF700",
                color: "black",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "#ccba00" },
              }}
            >
              {salvando ? "Gravando Dados..." : "Gravar Registro Diário"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
