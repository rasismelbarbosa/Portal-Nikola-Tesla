"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function NavbarAluno() {
  const router = useRouter();
  const supabase = createClient();

  const fazerLogoff = async () => {
    await supabase.auth.signOut();
    router.push("/  ");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#0f172a", // Fundo escuro sólido
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        borderBottom: "2px solid",
        borderColor: "primary.main", // Uma linha roxa/primária embaixo para dar estilo
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", minHeight: "70px" }}
        >
          {/* ==========================================
              ESQUERDA: Logo e Nome do Sistema
          ========================================== */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ position: "relative", width: 40, height: 40 }}>
              <Image
                src="/logo-tesla-branco.svg"
                alt="Logo Projeto Tesla"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Typography
              component={Link}
              href={"/painel"}
              variant="h6"
              sx={{
                fontWeight: "900",
                color: "white",
                letterSpacing: 1,
                textDecoration: "none",
              }}
            >
              BASE TESLA
            </Typography>
          </Box>

          {/* ==========================================
              DIREITA: Perfil do Aluno e Botão Sair
          ========================================== */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 3 },
            }}
          >
            <Button
              component={Link}
              href="/painel/termometro"
              variant="contained"
              startIcon={<AssessmentIcon />}
              sx={{
                bgcolor: "#FFF700",
                color: "#0a0a0a",
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
                display: { xs: "none", sm: "flex" }, // Esconde o texto em telemóveis muito pequenos
                "&:hover": { bgcolor: "#e6df00" },
              }}
            >
              Termómetro
            </Button>
            <Button
              onClick={fazerLogoff}
              variant="outlined"
              color="error" // Cor vermelha do Material UI
              size="small"
              endIcon={<LogoutIcon />}
              sx={{
                borderRadius: 4,
                fontWeight: "bold",
                textTransform: "none",
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Desconectar
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
