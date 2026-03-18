"use client";

import { Box, Typography, Container } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function AutoAvaliacaoPage() {
  return (
    <Box sx={{ backgroundColor: "#0f172a", minHeight: "100vh", pt: 10 }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <ConstructionIcon sx={{ fontSize: 80, color: "#FFF700", mb: 2 }} />
        <Typography variant="h4" fontWeight="900" color="white" gutterBottom>
          Área de Autoavaliação
        </Typography>
        <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Esta secção da Base Tesla está a ser forjada pelos nossos engenheiros.
          Volte em breve! 🚀
        </Typography>
      </Container>
    </Box>
  );
}
