"use client";

import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

// Importando os ícones para os pilares e badges
import PublicIcon from "@mui/icons-material/Public";
import ScienceIcon from "@mui/icons-material/Science";
import RecyclingIcon from "@mui/icons-material/Recycling";
import CodeIcon from "@mui/icons-material/Code";
import MicIcon from "@mui/icons-material/Mic";
import ShieldIcon from "@mui/icons-material/Shield";

export default function HomeTesla() {
  return (
    <Box
      sx={{ backgroundColor: "background.default", minHeight: "100vh", pb: 10 }}
    >
      {/* ==========================================
          1. HERO SECTION (O Chamado)
      ========================================== */}
      <Box
        sx={{
          backgroundImage: `
            linear-gradient(
              rgba(15, 23, 42, 0.85), /* Azul bem escuro, quase Cyberpunk */
              rgba(15, 23, 42, 0.95)
            ),
            url('/Projeto Criador de colagens.png') /* Lembre de colocar essa imagem na pasta public! */
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Efeito Parallax
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: 2,
            mb: 2,
            fontSize: { xs: "2.5rem", md: "4.5rem" },
          }}
        >
          O Futuro Depende de Nós
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.8)",
            maxWidth: 700,
            mb: 4,
            fontWeight: "400",
          }}
        >
          A resistência tecnológica começa aqui. Transformando alunos da Escola
          Maria Nalva em inventores através da robótica sustentável e da cultura
          maker.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem", borderRadius: 8 }}
          >
            Acessar Portal do Aluno
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: 8,
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": { borderColor: "white" },
            }}
          >
            Conhecer o Enredo
          </Button>
        </Box>
      </Box>

      {/* ==========================================
          2. OS 4 PILARES DO PROJETO
      ========================================== */}
      <Container
        sx={{ mt: 1, position: "relative", zIndex: 10, flexDirection: "row" }}
      >
        <Grid container spacing={3}>
          {/* Pilar 1 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <PublicIcon
                  sx={{ fontSize: 50, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Cidadania
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Formando líderes conscientes e atuantes na comunidade da Zona
                  Norte.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pilar 2 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <ScienceIcon sx={{ fontSize: 50, color: "info.main", mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Ciência
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Aprendizado pela descoberta e resolução de problemas reais.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pilar 3 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <RecyclingIcon
                  sx={{ fontSize: 50, color: "secondary.main", mb: 2 }}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Sustentável
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transformando sucata e lixo eletrônico em tecnologia de ponta.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pilar 4 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <CodeIcon sx={{ fontSize: 50, color: "warning.main", mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Tecnologia
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Impressão 3D, programação e eletrônica na prática.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* ==========================================
          3. JORNADA E CONQUISTAS (Gamificação)
      ========================================== */}
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Texto Explicativo */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="overline"
              color="primary"
              fontWeight="bold"
              sx={{ letterSpacing: 2 }}
            >
              A Metodologia
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ mt: 1 }}
            >
              Não é uma aula. <br /> É uma Missão.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              No Projeto Tesla, os alunos são divididos em Guildas e precisam
              resolver problemas reais para avançar na narrativa. De "A Chispa
              da Vida" até a construção da "Cidade do Futuro", cada etapa exige
              trabalho em equipe e raciocínio lógico.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {/* Badge 1 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{ bgcolor: "secondary.main", width: 50, height: 50 }}
                >
                  <RecyclingIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Mestre da
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Reciclagem
                  </Typography>
                </Box>
              </Box>

              {/* Badge 2 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "warning.main", width: 50, height: 50 }}>
                  <MicIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Voz da
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Resistência
                  </Typography>
                </Box>
              </Box>

              {/* Badge 3 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 50, height: 50 }}>
                  <ShieldIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Guardião do
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Futuro
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Imagem ou Ilustração à direita */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                width: "100%",
                height: 400,
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed rgba(0,0,0,0.2)",
              }}
            >
              <Typography color="text.secondary">
                [Coloque uma imagem do Vibrobot ou Semáforo Inteligente aqui]
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
