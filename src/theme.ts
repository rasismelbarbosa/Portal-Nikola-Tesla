"use client";

import { createTheme } from "@mui/material/styles";
import "@fontsource/lustria";
import { Lustria, Inter } from "next/font/google";

const lustria = Lustria({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#059975", // O Roxo principal
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#956Ad9", // O Verde
      contrastText: "#ffffff",
    },
    error: {
      main: "#CD191E",
    },
    warning: {
      main: "#FF7F50", // O Coral
    },
    info: {
      main: "#FFF700", // O Amarelo
    },
    text: {
      primary: "#000",
      secondary: "#059975",
      disabled: "#FFF",
    },
    background: {
      default: "#f5f5f5", // Cor de fundo das telas
      paper: "#ffffff", // Cor de fundo dos Cards
    },
  },
  typography: {
    // Isso diz para o MUI usar a mesma fonte padrão do seu Next.js
    fontFamily: lustria.style.fontFamily,
    // allVariants: ,
    button: {
      fontWeight: "bold", // Todo botão já vai nascer com texto negrito
      textTransform: "none", // Impede que os botões fiquem TUDO EM MAIÚSCULO por padrão
    },
  },
  shape: {
    borderRadius: 12, // Tudo vai nascer com borda arredondada estilo app mobile
  },
});
