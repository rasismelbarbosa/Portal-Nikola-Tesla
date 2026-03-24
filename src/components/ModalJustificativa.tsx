"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";

interface Aluno {
  id: string;
  nome: string;
}

interface ModalJustificativaProps {
  open: boolean;
  onClose: () => void;
  alunos: Aluno[]; // Apenas os alunos que receberam "Justificado"
  onConfirm: (justificativas: Record<string, string>) => void;
}

export default function ModalJustificativa({
  open,
  onClose,
  alunos,
  onConfirm,
}: ModalJustificativaProps) {
  // Estado para guardar o texto de cada aluno { "id_do_aluno": "Motivo..." }
  const [textos, setTextos] = useState<Record<string, string>>({});

  // Limpa os campos sempre que o modal abrir
  useEffect(() => {
    if (open) {
      const inicial: Record<string, string> = {};
      alunos.forEach((a) => (inicial[a.id] = ""));
      setTextos(inicial);
    }
  }, [open, alunos]);

  const handleChange = (id: string, valor: string) => {
    setTextos((prev) => ({ ...prev, [id]: valor }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#1e293b",
          color: "white",
          borderRadius: 3,
          border: "1px solid rgba(255, 247, 0, 0.3)",
        },
      }}
    >
      <DialogTitle sx={{ color: "#FFF700", fontWeight: "bold" }}>
        Justificar Faltas
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}
        >
          Por favor, registe o motivo da ausência para os alunos selecionados
          abaixo:
        </Typography>

        {alunos.map((aluno) => (
          <Box key={aluno.id} sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              {aluno.nome}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Ex: Atestado médico, problema familiar..."
              value={textos[aluno.id] || ""}
              onChange={(e) => handleChange(aluno.id, e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "rgba(255, 247, 0, 0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#FFF700" },
                },
                "& .MuiInputBase-input": { color: "white" },
              }}
            />
          </Box>
        ))}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: "rgba(255,255,255,0.7)" }}>
          Cancelar
        </Button>
        <Button
          onClick={() => onConfirm(textos)}
          variant="contained"
          sx={{
            bgcolor: "#FFF700",
            color: "black",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#ccba00" },
          }}
        >
          Confirmar e Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
