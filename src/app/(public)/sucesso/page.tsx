"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Container,
} from "@mui/material";
import Link from "next/link";

// Ícones do Material UI
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HomeIcon from "@mui/icons-material/Home";

export default function SucessoPage() {
  return (
    // Fundo Roxo da paleta Tesla para manter a continuidade visual da inscrição
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#956AD9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
            textAlign: "center",
            overflow: "visible", // Permite que o ícone vaze para fora do cartão
            position: "relative",
            mt: 5,
          }}
        >
          {/* Ícone de Sucesso flutuante no topo */}
          <Box
            sx={{
              position: "absolute",
              top: -40,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "#059975", // Verde Veronese da sua paleta
              color: "white",
              borderRadius: "50%",
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 16px rgba(5, 153, 117, 0.4)",
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 50 }} />
          </Box>

          <CardContent sx={{ pt: 8, pb: 4, px: { xs: 3, sm: 5 } }}>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{ color: "#059975", mb: 2 }}
            >
              Pré-inscrição Recebida!
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, fontSize: "1.1rem" }}
            >
              Os seus dados foram guardados com sucesso no nosso sistema. A
              primeira fase da sua missão está concluída.
            </Typography>

            {/* A caixa de aviso amarela */}
            <Alert
              severity="warning"
              sx={{
                mb: 4,
                textAlign: "left",
                borderRadius: 2,
                "& .MuiAlert-message": { width: "100%" },
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Atenção:
              </Typography>
              A sua vaga só será garantida após a entrega do{" "}
              <strong>Termo de Consentimento</strong> assinado na coordenação do
              Projeto Nikola Tesla.
            </Alert>

            {/* Botão de regresso à base */}
            <Button
              component={Link}
              href="/"
              variant="contained"
              fullWidth
              startIcon={<HomeIcon />}
              sx={{
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: 3,
                bgcolor: "#956AD9",
                "&:hover": { bgcolor: "#7b54b8" },
              }}
            >
              Voltar à Base (Início)
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
