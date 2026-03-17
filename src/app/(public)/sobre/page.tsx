"use client";

import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

// Ícones
import TerminalIcon from "@mui/icons-material/Terminal";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import GroupsIcon from "@mui/icons-material/Groups";
import MemoryIcon from "@mui/icons-material/Memory";

export default function OEnredo() {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        pt: 12,
        pb: 10,
      }}
    >
      {/* ==========================================
          1. CABEÇALHO (O Chamado)
      ========================================== */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 8 }}>
        <WifiTetheringIcon
          sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
        />
        <Typography
          variant="h3"
          fontWeight="900"
          sx={{ textTransform: "uppercase", letterSpacing: 2 }}
        >
          Transmissão Interceptada
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          Ano de Origem: 2077 | Destinatário: Alunos da Escola Maria Nalva (Zona
          Norte, Natal)
        </Typography>
      </Container>

      {/* ==========================================
          2. O TERMINAL (A Mensagem de Tesla)
      ========================================== */}
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "#0a0a0a", // Fundo quase preto
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            boxShadow: "0 0 30px rgba(149, 106, 217, 0.2)", // Brilho roxo ao redor
            border: "1px solid rgba(149, 106, 217, 0.3)",
            position: "relative",
          }}
        >
          {/* Barra de título do terminal */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
              color: "primary.main",
            }}
          >
            <TerminalIcon />
            <Typography
              variant="overline"
              fontWeight="bold"
              sx={{ letterSpacing: 2 }}
            >
              Decodificando arquivo: tesla_legacy.sys
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

          {/* Texto do Enredo com fonte de programação */}
          <Typography
            variant="body1"
            sx={{
              fontFamily: "monospace", // Fonte estilo código!
              color: "#4ade80", // Verde neon estilo Matrix
              fontSize: "1.1rem",
              lineHeight: 1.8,
              textShadow: "0 0 5px rgba(74, 222, 128, 0.3)", // Leve brilho na letra
            }}
          >
            "Saudações, jovens. Se estão a ler isto, a minha transmissão
            temporal funcionou.
            <br />
            <br />
            No meu tempo, o mundo ruiu. A tecnologia, que deveria ser a nossa
            salvação, foi usada com egoísmo. O lixo eletrónico consumiu as
            nossas cidades e esquecemo-nos de como criar. Tornámo-nos apenas
            consumidores inertes.
            <br />
            <br />
            Mas os meus cálculos mostram uma anomalia na linha do tempo. Um
            ponto de virada exato: A Zona Norte de Natal, no tempo presente.
            Vocês.
            <br />
            <br />
            Preciso que despertem. O Projeto Tesla não é uma simples aula, é o
            vosso treino. Vocês aprenderão a dominar a eletrónica, a reciclar o
            que foi descartado e a dar vida ao metal. Formem as vossas Guildas,
            concluam as Missões e construam a Cidade do Futuro.
            <br />
            <br />
            A resistência começa nas vossas mãos. O futuro depende de vocês."
            <br />
            <br />— N. Tesla.
          </Typography>
        </Box>
      </Container>

      {/* ==========================================
          3. COMO FUNCIONA A JORNADA (Regras do Jogo)
      ========================================== */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          A Sua Missão
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: 600, mx: "auto" }}
        >
          Para alterar o futuro, os alunos passarão por um rigoroso treinamento
          prático dividido em etapas cruciais.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                backgroundColor: "rgba(149, 106, 217, 0.05)",
                border: "1px solid rgba(149, 106, 217, 0.1)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <GroupsIcon
                  sx={{ fontSize: 40, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  As Guildas
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Ninguém salva o mundo sozinho. Os alunos são divididos em
                  equipes chamadas "Guildas". Vocês trabalharão juntos para
                  montar os circuitos, programar os robôs e desenvolver a
                  oratória para defender os vossos projetos perante o conselho.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                backgroundColor: "rgba(47, 158, 65, 0.05)",
                border: "1px solid rgba(47, 158, 65, 0.1)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <MemoryIcon
                  sx={{ fontSize: 40, color: "secondary.main", mb: 2 }}
                />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  A Sucata Vira Ouro
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Não compraremos kits prontos. O vosso treino envolve "Anatomia
                  do Lixo". Desmontaremos leitores de DVD antigos e mouses
                  estragados para extrair motores DC, engrenagens e LEDs. A
                  sustentabilidade é a vossa principal arma.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
