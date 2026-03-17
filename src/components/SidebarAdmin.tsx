"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Atenção ao import do client!
import Image from "next/image";

// Ícones
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import FactCheckIcon from "@mui/icons-material/FactCheck"; // Para o PAPE (Checklist)
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects"; // Para o PAP-PC (Criatividade)
import LogoutIcon from "@mui/icons-material/Logout";

const LARGURA_MENU = 280;

export default function SidebarAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const fazerLogoff = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    {
      titulo: "Visão Geral",
      rota: "/painel-professor",
      icone: <DashboardIcon />,
    },
    {
      titulo: "Turmas e Guildas",
      rota: "/painel-professor/turmas",
      icone: <GroupIcon />,
    },
    {
      titulo: "Avaliação PAPE (Prática)",
      rota: "/painel-professor/avaliacao-pape",
      icone: <FactCheckIcon />,
    },
    {
      titulo: "Avaliação PAP-PC (Portfólio)",
      rota: "/painel-professor/avaliacao-pap",
      icone: <EmojiObjectsIcon />,
    },
    {
      titulo: "Feedback Formativo",
      rota: "/painel-professor/feedback",
      icone: <FactCheckIcon />,
    }, // Pode usar outro ícone se preferir
  ];

  return (
    <Drawer
      variant="permanent" // Fica sempre visível no PC
      sx={{
        width: LARGURA_MENU,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: LARGURA_MENU,
          boxSizing: "border-box",
          bgcolor: "#0a0a0a", // Fundo escuro
          color: "white",
          borderRight: "1px solid rgba(149, 106, 217, 0.2)", // Borda roxa subtil
        },
      }}
    >
      {/* CABEÇALHO DO MENU */}
      <Box
        sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5, mt: 2 }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            p: 1,
            borderRadius: 2,
            display: "flex",
          }}
        >
          <Box sx={{ position: "relative", width: 30, height: 30 }}>
            <Image
              src="/logo-tesla-branco.svg"
              alt="Logo Tesla"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            variant="h6"
            fontWeight="900"
            sx={{ letterSpacing: 1, lineHeight: 1.2 }}
          >
            TORRE TESLA
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "secondary.main", fontWeight: "bold" }}
          >
            Acesso Coordenador
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 2 }} />

      {/* LISTA DE LINKS */}
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.rota; // Verifica se estamos na página atual

          return (
            <ListItem key={item.rota} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={item.rota}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive
                    ? "rgba(149, 106, 217, 0.15)"
                    : "transparent",
                  color: isActive ? "#FFF700" : "rgba(255,255,255,0.7)",
                  border: isActive
                    ? "1px solid rgba(149, 106, 217, 0.5)"
                    : "1px solid transparent",
                  "&:hover": {
                    bgcolor: "rgba(149, 106, 217, 0.1)",
                    color: "white",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#FFF700" : "rgba(255,255,255,0.5)",
                    minWidth: 40,
                  }}
                >
                  {item.icone}
                </ListItemIcon>
                <ListItemText
                  primary={item.titulo}
                  primaryTypographyProps={{
                    fontWeight: isActive ? "bold" : "medium",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* BOTÃO DE SAÍDA */}
      <Box sx={{ p: 2, mb: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={fazerLogoff}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            borderWidth: 2,
            "&:hover": { borderWidth: 2 },
          }}
        >
          Encerrar Sessão
        </Button>
      </Box>
    </Drawer>
  );
}
