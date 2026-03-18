"use client";

import { useActionState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
} from "@mui/material";
import Image from "next/image";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { fazerLogin } from "./actions";

export default function LoginPage() {
  // O hook que liga o nosso formulário à Server Action
  const [state, formAction, isPending] = useActionState(fazerLogin, null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a0a", // Fundo escuro tecnológico
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(149, 106, 217, 0.1) 0%, #0a0a0a 100%)",
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(149, 106, 217, 0.2)",
            boxShadow: "0 0 40px rgba(149, 106, 217, 0.1)",
            textAlign: "center",
            overflow: "visible",
            position: "relative",
            mt: "20%",
          }}
        >
          {/* Ícone de Cadeado Flutuante */}
          <Box
            sx={{
              position: "absolute",
              top: -40,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "#956AD9",
              color: "white",
              borderRadius: "50%",
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(149, 106, 217, 0.4)",
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40 }} />
          </Box>

          <CardContent sx={{ pt: 8, pb: 4, px: 4 }}>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ position: "relative", width: 60, height: 60, mb: 2 }}>
                <Image
                  src="/logo-tesla-branco.svg"
                  alt="Logo Tesla"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography
                variant="h5"
                fontWeight="900"
                sx={{ color: "white", letterSpacing: 1 }}
              >
                BASE TESLA
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.5)", mt: 1 }}
              >
                Acesso restrito a inventores autorizados.
              </Typography>
            </Box>

            <form action={formAction}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  name="email"
                  label="E-mail de Acesso"
                  variant="outlined"
                  type="email"
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.5)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                      "&:hover fieldset": { borderColor: "#956AD9" },
                      "&.Mui-focused fieldset": { borderColor: "#FFF700" },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Palavra-passe"
                  variant="outlined"
                  type="password"
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.5)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                      "&:hover fieldset": { borderColor: "#956AD9" },
                      "&.Mui-focused fieldset": { borderColor: "#FFF700" },
                    },
                  }}
                />

                {state?.mensagem && !state.sucesso && (
                  <Alert
                    severity="error"
                    sx={{
                      borderRadius: 2,
                      bgcolor: "rgba(211, 47, 47, 0.1)",
                      color: "#ffb4ab",
                      border: "1px solid rgba(211, 47, 47, 0.3)",
                    }}
                  >
                    {state.mensagem}
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  variant="contained"
                  fullWidth
                  startIcon={<ElectricBoltIcon />}
                  sx={{
                    py: 1.5,
                    mt: 1,
                    fontSize: "1rem",
                    fontWeight: "900",
                    borderRadius: 3,
                    bgcolor: "#FFF700",
                    color: "#0a0a0a",
                    "&:hover": { bgcolor: "#e6df00" },
                  }}
                >
                  {isPending ? "A Descodificar..." : "INICIAR SESSÃO"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
