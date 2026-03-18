"use client";

import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

// Ícones para cada missão
import BugReportIcon from "@mui/icons-material/BugReport"; // Pro Vibrobot
import TrafficIcon from "@mui/icons-material/Traffic"; // Pro Semáforo
import LocationCityIcon from "@mui/icons-material/LocationCity"; // Pra Cidade
import SmartToyIcon from "@mui/icons-material/SmartToy"; // Pro Guardião
import LockIcon from "@mui/icons-material/Lock"; // Para missões bloqueadas

// O nosso banco de dados fixo de missões do ano
const cronogramaMissoes = [
  {
    id: 1,
    fase: "MISSÃO 1",
    titulo: "A Chispa da Vida",
    projeto: "Vibrobot / Drawbot",
    descricao:
      "A anatomia do lixo. Aprenda a extrair motores DC de leitores de DVD antigos e construa o seu primeiro robô inseto movido a vibração. O primeiro passo para dominar a sucata.",
    icone: <BugReportIcon sx={{ fontSize: 40 }} />,
    status: "Desbloqueada",
    cor: "primary.main",
  },
  {
    id: 2,
    fase: "MISSÃO 2",
    titulo: "A Luz da Razão",
    projeto: "Semáforo Inteligente",
    descricao:
      "A cidade do passado precisa de ordem. Entenda a lógica de programação, algoritmos e crie o código das cores para automatizar uma estrutura de papelão usando LEDs.",
    icone: <TrafficIcon sx={{ fontSize: 40 }} />,
    status: "Desbloqueada",
    cor: "secondary.main",
  },
  {
    id: 3,
    fase: "MISSÃO 6", // Pulamos para a 6 para focar nas grandes
    titulo: "A Cidade do Futuro",
    projeto: "Maquete Inteligente",
    descricao:
      "Una tudo o que aprendeu. Construa as zonas residenciais e industriais e programe a Iluminação Pública Automática usando sensores LDR (Luz). A cidade ganha vida.",
    icone: <LocationCityIcon sx={{ fontSize: 40 }} />,
    status: "Criptografada", // Missão futura!
    cor: "text.disabled",
  },
  {
    id: 4,
    fase: "MISSÃO 7",
    titulo: "O Grande Legado",
    projeto: "Robô Guardião",
    descricao:
      "O desafio final. Usando Design Thinking, a sua Guilda vai identificar um problema real da comunidade e prototipar um robô funcional para resolvê-lo.",
    icone: <SmartToyIcon sx={{ fontSize: 40 }} />,
    status: "Criptografada", // Missão futura!
    cor: "text.disabled",
  },
];

export default function Missoes() {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        pt: 12,
        pb: 10,
      }}
    >
      {/* CABEÇALHO */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="overline"
          fontWeight="bold"
          color="primary"
          sx={{ letterSpacing: 2 }}
        >
          Arquivo Confidencial
        </Typography>
        <Typography
          variant="h3"
          fontWeight="900"
          sx={{ textTransform: "uppercase", mt: 1 }}
        >
          Registro de Missões
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mt: 2, maxWidth: 600, mx: "auto" }}
        >
          O treinamento não é linear. Cada etapa exige que a sua Guilda domine
          uma nova habilidade para avançar no plano de Tesla.
        </Typography>
      </Container>

      {/* LISTA DE MISSÕES (O Caminho) */}
      <Container maxWidth="md">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {cronogramaMissoes.map((missao, index) => {
            const isBloqueada = missao.status === "Criptografada";

            return (
              <Card
                key={missao.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  borderRadius: 4,
                  backgroundColor: isBloqueada
                    ? "rgba(0,0,0,0.02)"
                    : "background.paper",
                  borderLeft: "8px solid",
                  borderLeftColor: missao.cor,
                  boxShadow: isBloqueada
                    ? "none"
                    : "0 10px 30px rgba(0,0,0,0.08)",
                  opacity: isBloqueada ? 0.7 : 1, // Deixa as missões futuras meio transparentes
                  position: "relative",
                  overflow: "visible",
                }}
              >
                {/* ÍCONE GRANDE NA ESQUERDA */}
                <Box
                  sx={{
                    p: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isBloqueada
                      ? "rgba(0,0,0,0.04)"
                      : "rgba(149, 106, 217, 0.05)",
                    borderRight: { sm: "1px solid rgba(0,0,0,0.05)" },
                  }}
                >
                  <Box sx={{ color: missao.cor }}>{missao.icone}</Box>
                </Box>

                {/* CONTEÚDO DA MISSÃO */}
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="overline"
                        fontWeight="900"
                        color={missao.cor}
                        sx={{ letterSpacing: 1 }}
                      >
                        {missao.fase}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {missao.titulo}
                      </Typography>
                    </Box>

                    {/* Badge de Status */}
                    <Chip
                      label={missao.status}
                      icon={isBloqueada ? <LockIcon /> : undefined}
                      color={isBloqueada ? "default" : "primary"}
                      variant={isBloqueada ? "outlined" : "filled"}
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.7 }}
                  >
                    {missao.descricao}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ color: isBloqueada ? "text.disabled" : "#333" }}
                  >
                    OBJETIVO TÁTICO: {missao.projeto}
                  </Typography>
                </CardContent>

                {/* Linha de conexão visual (exceto no último item) */}
                {index !== cronogramaMissoes.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      position: "absolute",
                      bottom: -32,
                      left: 50,
                      height: 32,
                      width: 2,
                      backgroundColor: "rgba(0,0,0,0.1)",
                    }}
                  />
                )}
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
