"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

// Ícones de Contato
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CodeIcon from "@mui/icons-material/Code";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0a0a0a", // Quase preto para ancorar o final do site
        color: "white",
        pt: 8,
        pb: 4,
        borderTop: "1px solid rgba(149, 106, 217, 0.2)", // Linha roxa bem sutil no topo
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* ==========================================
              COLUNA 1: Logo e Missão
          ========================================== */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Box sx={{ position: "relative", width: 40, height: 40 }}>
                <Image
                  src="/logo-tesla-branco.svg"
                  alt="Logo Projeto Tesla"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "900", letterSpacing: 1 }}
              >
                PROJETO TESLA
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 2,
                maxWidth: 300,
                lineHeight: 1.7,
              }}
            >
              Transformando alunos da Escola Maria Nalva em inventores através
              da robótica sustentável e da cultura maker.
            </Typography>
          </Grid>

          {/* ==========================================
              COLUNA 2: Acesso Rápido
          ========================================== */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mb: 2, color: "primary.main" }}
            >
              Base de Dados (Links)
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                component={Link}
                href="/"
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  "&:hover": { color: "white" },
                }}
              >
                Início
              </Typography>
              <Typography
                component={Link}
                href="/sobre"
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  "&:hover": { color: "white" },
                }}
              >
                O Enredo
              </Typography>
              <Typography
                component={Link}
                href="/missoes"
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  "&:hover": { color: "white" },
                }}
              >
                Mapa de Missões
              </Typography>
              <Typography
                component={Link}
                href="/inscricoes"
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  "&:hover": { color: "white" },
                }}
              >
                Quero me Inscrever
              </Typography>
            </Box>
          </Grid>

          {/* ==========================================
              COLUNA 3: Contato e Redes
          ========================================== */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mb: 2, color: "primary.main" }}
            >
              Comunicações Oficiais
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1.5,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">
                Escola Maria Nalva - Zona Norte, Natal/RN
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
              <IconButton
                component="a"
                href="https://www.instagram.com/projeton.tesla/"
                target="_blank"
                sx={{
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.05)",
                  "&:hover": { bgcolor: "primary.main" },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://wa.me/558486662321"
                target="_blank"
                sx={{
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.05)",
                  "&:hover": { bgcolor: "#059975" },
                }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* LINHA DIVISÓRIA E COPYRIGHT */}
        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            &copy; {new Date().getFullYear()} Projeto Nikola Tesla. Todos os
            direitos reservados.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <CodeIcon fontSize="small" /> Desenvolvido pelo Prof. Ismael Barbosa
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
