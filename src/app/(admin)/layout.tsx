import SidebarAdmin from "@/components/SidebarAdmin";
import { Box } from "@mui/material";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f172a" }}>
      {/* O nosso Menu Lateral injetado aqui */}
      <SidebarAdmin />

      {/* O conteúdo dinâmico das páginas (Dashboard, Avaliações, etc.) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "calc(100% - 280px)", // Desconta a largura exata do menu
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
