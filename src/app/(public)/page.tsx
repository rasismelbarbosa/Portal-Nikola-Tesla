"use client";

import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import Image from "next/image";

// Importando os ícones para os pilares e badges
import PublicIcon from "@mui/icons-material/Public";
import ScienceIcon from "@mui/icons-material/Science";
import RecyclingIcon from "@mui/icons-material/Recycling";
import CodeIcon from "@mui/icons-material/Code";
import MicIcon from "@mui/icons-material/Mic";
import ShieldIcon from "@mui/icons-material/Shield";

export default function Home() {
  return (
    <Box
      sx={{ backgroundColor: "background.default", minHeight: "100vh", pb: 10 }}
    >
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
            href="/login"
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem", borderRadius: 8 }}
          >
            Acessar Portal do Aluno
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="/sobre"
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

      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          width={"90vw"}
          // bgcolor={"#f5f"}
          minHeight={"25vh"}
          marginTop={1}
          display={"flex"}
          flexDirection={{ md: "row", pq: "column" }}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          gap={4}
        >
          <Card
            sx={{
              height: "100%",
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <PublicIcon sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Cidadania
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Formando líderes conscientes e atuantes na comunidade da Zona
                Norte.
              </Typography>
            </CardContent>
          </Card>

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
        </Box>
      </Box>

      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="overline"
          color="primary"
          fontWeight="bold"
          alignSelf={"center"}
          sx={{ letterSpacing: 2 }}
        >
          A Metodologia
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 1 }}
          alignSelf={"center"}
          textAlign={"center"}
        >
          Não é uma aula. <br /> É uma Missão.
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            fontSize: "1.1rem",
            lineHeight: 1.8,
            width: "90%",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          No Projeto Tesla, os alunos são divididos em Guildas e precisam
          resolver problemas reais para avançar na narrativa. De "A Chispa da
          Vida" até a construção da "Cidade do Futuro", cada etapa exige
          trabalho em equipe e raciocínio lógico.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {/* Badge 1 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "secondary.main", width: 50, height: 50 }}>
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

        <Box
          sx={{
            width: "90%",
            height: { xs: 500, sm: 400 }, // Um pouco mais alto no celular para acomodar as 3 fotos
            display: "grid",
            alignSelf: "center",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gridTemplateRows: { xs: "repeat(3, 1fr)", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {/* FOTO PRINCIPAL (Cidade Inteligente / Trabalho em Equipe) */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 4,
              gridRow: { sm: "span 2" }, // Estica até embaixo no PC
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Image
              src="/Tesla/IMG_20241206_143218884.jpg"
              alt="Alunos construindo a maquete da Cidade Inteligente"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>

          {/* FOTO SECUNDÁRIA 1 (Tecnologia / Impressão 3D) */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 4,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <Image
              src="/Tesla/IMG_20241122_143545315.jpg"
              alt="Impressora 3D fabricando peças para o projeto"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>

          {/* FOTO SECUNDÁRIA 2 (Robótica Sustentável / Drawbots) */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 4,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <Image
              src="/Tesla/IMG_20240510_151544716_HDR.jpg"
              alt="Robôs Drawbot construídos com materiais recicláveis"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
