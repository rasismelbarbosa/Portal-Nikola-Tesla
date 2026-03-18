"use client";

import { useState } from "react";
import { Box, Drawer, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// ATENÇÃO: Verifique se o caminho da sua Sidebar está correto aqui embaixo!
import SidebarAdmin from "@/components/SidebarAdmin";

const larguraBarra = 280;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado que controla se o menu do telemóvel está aberto ou fechado
  const [menuAberto, setMenuAberto] = useState(false);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f172a" }}>
      {/* 📱 BARRA SUPERIOR (SÓ APARECE NO TELEMÓVEL) */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${larguraBarra}px)` },
          ml: { md: `${larguraBarra}px` },
          display: { xs: "block", md: "none" }, // Esconde no PC
          bgcolor: "#1e293b",
          borderBottom: "1px solid rgba(149, 106, 217, 0.3)",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={alternarMenu}
            sx={{ color: "#956AD9" }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 🚀 BARRA LATERAL (SIDEBAR) */}
      <Box
        component="nav"
        sx={{ width: { md: larguraBarra }, flexShrink: { md: 0 } }}
      >
        {/* Versão Telemóvel (Gaveta que desliza) */}
        <Drawer
          variant="temporary"
          open={menuAberto}
          onClose={alternarMenu}
          ModalProps={{ keepMounted: true }} // Melhora a performance no telemóvel
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: larguraBarra,
              bgcolor: "#1e293b",
            },
          }}
        >
          {/* O onClick aqui faz o menu fechar sozinho quando o utilizador clica num link! */}
          <Box onClick={alternarMenu} sx={{ height: "100%" }}>
            <SidebarAdmin />
          </Box>
        </Drawer>

        {/* Versão PC (Fixa na esquerda) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: larguraBarra,
              bgcolor: "#1e293b",
              borderRight: "1px solid rgba(149, 106, 217, 0.2)",
            },
          }}
          open
        >
          <SidebarAdmin />
        </Drawer>
      </Box>

      {/* 📝 CONTEÚDO PRINCIPAL DA PÁGINA */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 }, // Menos margem no telemóvel, mais no PC
          width: { xs: "100%", md: `calc(100% - ${larguraBarra}px)` },
          mt: { xs: 8, md: 0 }, // Empurra o conteúdo para baixo no telemóvel por causa da barra superior
          overflowX: "hidden", // Evita que a página balance para os lados
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
