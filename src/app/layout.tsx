import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../theme";

// 1. IMPORTE A SUA NAVBAR AQUI
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Portal Tesla",
  description: "A resistência tecnológica começa aqui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* 2. COLOQUE A NAVBAR ANTES DO CHILDREN */}
            {/* <Navbar /> */}

            {/* 3. ENVOLVA O CHILDREN EM UM MAIN PARA DAR ESPAÇO */}
            <main style={{ minHeight: "100vh" }}>{children}</main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
