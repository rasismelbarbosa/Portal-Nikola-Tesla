"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SaveIcon from "@mui/icons-material/Save";
import { createClient } from "@/utils/supabase/client";

export default function PontoAdminPage() {
  const supabase = createClient();
  const [registros, setRegistros] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [form, setForm] = useState({
    data_registro: new Date().toISOString().split("T")[0],
    hora_entrada: "11:20",
    hora_saida: "12:10",
    descricao: "Encontro regular Projeto Tesla",
  });

  const buscarPonto = async () => {
    const { data } = await supabase
      .from("ponto_admin")
      .select("*")
      .order("data_registro", { ascending: false });
    if (data) setRegistros(data);
    setCarregando(false);
  };

  useEffect(() => {
    buscarPonto();
  }, [supabase]);

  // 🚀 O MOTOR DE CÁLCULO HH:MM
  const calcularDiferenca = (entrada: string, saida: string) => {
    const [hE, mE] = entrada.split(":").map(Number);
    const [hS, mS] = saida.split(":").map(Number);

    const totalMinutosEntrada = hE * 60 + mE;
    const totalMinutosSaida = hS * 60 + mS;

    let diff = totalMinutosSaida - totalMinutosEntrada;
    if (diff < 0) diff += 24 * 60; // Tratamento para virada de dia

    const horas = Math.floor(diff / 60);
    const minutos = diff % 60;

    // Formata para garantir o zero à esquerda (ex: 01:05)
    const hFormat = String(horas).padStart(2, "0");
    const mFormat = String(minutos).padStart(2, "0");

    return `${hFormat}:${mFormat}`;
  };

  const handleSalvar = async () => {
    setSalvando(true);

    // Calcula o tempo antes de inserir
    const tempoCalculado = calcularDiferenca(
      form.hora_entrada,
      form.hora_saida,
    );

    const { error } = await supabase.from("ponto_admin").insert([
      {
        ...form,
        tempo: tempoCalculado,
      },
    ]);

    if (!error) {
      await buscarPonto();
    }
    setSalvando(false);
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "rgba(0,0,0,0.2)",
      "& fieldset": { borderColor: "rgba(149, 106, 217, 0.3)" },
      "&:hover fieldset": { borderColor: "#956AD9" },
      "&.Mui-focused fieldset": { borderColor: "#956AD9" },
    },
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", pb: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <AccessTimeIcon sx={{ fontSize: 40, color: "#956AD9" }} />
        <Box>
          <Typography variant="h4" fontWeight="bold" color="white">
            Controle de Ponto
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.6)">
            Registre a carga horária dedicada à Base Tesla.
          </Typography>
        </Box>
      </Box>

      <Paper
        sx={{
          bgcolor: "#1e293b",
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid rgba(149, 106, 217, 0.3)",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid sx={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              type="date"
              label="Data"
              value={form.data_registro}
              onChange={(e) =>
                setForm({ ...form, data_registro: e.target.value })
              }
              sx={textFieldStyle}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid sx={{ xs: 6, sm: 2 }}>
            <TextField
              fullWidth
              type="time"
              label="Entrada"
              value={form.hora_entrada}
              onChange={(e) =>
                setForm({ ...form, hora_entrada: e.target.value })
              }
              sx={textFieldStyle}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid sx={{ xs: 6, sm: 2 }}>
            <TextField
              fullWidth
              type="time"
              label="Saída"
              value={form.hora_saida}
              onChange={(e) => setForm({ ...form, hora_saida: e.target.value })}
              sx={textFieldStyle}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid sx={{ xs: 6, sm: 2 }}>
            <TextField
              fullWidth
              label="Atividade"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSalvar}
              disabled={salvando}
              sx={{
                height: 56,
                bgcolor: "#956AD9",
                "&:hover": { bgcolor: "#7a52b3" },
              }}
            >
              {salvando ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <SaveIcon />
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#1e293b",
          borderRadius: 3,
          border: "1px solid rgba(149, 106, 217, 0.2)",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "rgba(0,0,0,0.3)" }}>
            <TableRow>
              <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                Data
              </TableCell>
              <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                Horário
              </TableCell>
              <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                Atividade
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#FFF700", fontWeight: "bold" }}
              >
                Duração (hh:mm)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((reg) => (
              <TableRow
                key={reg.id}
                hover
                sx={{
                  "&:hover": { bgcolor: "rgba(149, 106, 217, 0.1) !important" },
                }}
              >
                <TableCell sx={{ color: "white" }}>
                  {new Date(reg.data_registro).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                  {reg.hora_entrada.slice(0, 5)} - {reg.hora_saida.slice(0, 5)}
                </TableCell>
                <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>
                  {reg.descricao}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={reg.tempo || "00:00"}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 247, 0, 0.1)",
                      color: "#FFF700",
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
