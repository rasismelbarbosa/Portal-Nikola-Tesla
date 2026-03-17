"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import Link from "next/link";

// Ícones para a Navbar
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(15, 23, 42, 0.75)", // O Azul escuro do Hero, mas 75% transparente
        backdropFilter: "blur(12px)", // A MÁGICA: Borra o que estiver por trás da barra!
        boxShadow: "none", // Tira a sombra padrão do Material Design
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Uma linha muito sutil para separar
      }}
    >
      {/* O Container centraliza o conteúdo em monitores gigantes (ultrawide) */}
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", minHeight: "70px" }}
        >
          {/* ==========================================
              ESQUERDA: Logo e Nome do Projeto
          ========================================== */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ position: "relative", width: 40, height: 40 }}>
              <Image
                src="/logo-tesla-branco.svg" // O nome do seu arquivo na pasta public
                alt="Logo Projeto Tesla"
                fill
                style={{ objectFit: "contain" }} // Contain garante que a logo não seja cortada
              />
            </Box>
            <Typography
              variant="h5"
              component={Link}
              href="/"
              sx={{
                fontWeight: "900",
                color: "white",
                textDecoration: "none",
                letterSpacing: 2,
              }}
            >
              PROJETO NIKOLA TESLA
            </Typography>
          </Box>

          {/* ==========================================
              CENTRO: Links (Escondidos no celular)
          ========================================== */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            <Button
              component={Link}
              href="/"
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontWeight: "bold",
                "&:hover": { color: "white" },
              }}
            >
              Início
            </Button>
            <Button
              component={Link}
              href="/sobre"
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontWeight: "bold",
                "&:hover": { color: "white" },
              }}
            >
              O Enredo
            </Button>
            <Button
              component={Link}
              href="/missoes"
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontWeight: "bold",
                "&:hover": { color: "white" },
              }}
            >
              Missões
            </Button>
          </Box>

          {/* ==========================================
              DIREITA: Botão de Acesso
          ========================================== */}
          <Box>
            <Button
              component={Link}
              href="/login"
              variant="contained"
              color="primary"
              endIcon={<LoginIcon />}
              sx={{
                borderRadius: 8, // Deixa o botão bem arredondado
                fontWeight: "bold",
                px: { xs: 2, md: 3 }, // Padding menor no celular
                py: 1,
              }}
            >
              Entrar
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
