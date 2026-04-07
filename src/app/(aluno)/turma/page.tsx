"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Avatar,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { createClient } from "@/utils/supabase/client";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

export default function MembrosTurmaPage() {
  const supabase = createClient();
  const [alunos, setAlunos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  // 🚀 NOVOS ESTADOS PARA O MOTOR DE PESQUISA E RANKING
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState<"xp" | "nome">("xp"); // XP como padrão para já abrir como Ranking!

  useEffect(() => {
    const buscarAlunosPublicos = async () => {
      // Mantenha aqui a exata mesma query que você conseguiu fazer funcionar com a sua FK!
      // (Seja 'guildas(nome)' ou 'guilda(nome)')
      const { data, error } = await supabase.from("alunos").select(`
          id, 
          nome, 
          nivel, 
          xp_atual,
          guildas (nome) 
        `);

      if (error) {
        console.error("Erro ao buscar a turma:", error);
      } else if (data) {
        setAlunos(data);
      }
      setCarregando(false);
    };

    buscarAlunosPublicos();
  }, [supabase]);

  // ⚙️ O MOTOR DE FILTRO E ORDENAÇÃO
  const alunosProcessados = alunos
    // 1. Filtra pelo nome que o aluno digitar na barra de pesquisa
    .filter((aluno) => aluno.nome.toLowerCase().includes(busca.toLowerCase()))
    // 2. Ordena baseado no botão escolhido
    .sort((a, b) => {
      if (ordenacao === "xp") {
        // Se empatar no XP, desempata por ordem alfabética
        if (b.xp_atual === a.xp_atual) {
          return a.nome.localeCompare(b.nome);
        }
        return (b.xp_atual || 0) - (a.xp_atual || 0); // Maior XP primeiro
      } else {
        return a.nome.localeCompare(b.nome); // A-Z
      }
    });

  return (
    <Box
      sx={{
        maxWidth: "100wv",
        mx: "auto",
        pb: 5,
        bgcolor: "#0f172a",
        minHeight: "100vh",
        px: 2,
        pt: 2,
      }}
    >
      {/* CABEÇALHO */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <PeopleAltIcon sx={{ fontSize: 40, color: "#956AD9" }} />
        <Box>
          <Typography variant="h4" fontWeight="bold" color="white">
            Base Tesla: Ranking e Agentes
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.6)">
            Pesquise por recrutas ou veja quem lidera a tabela de XP do projeto.
          </Typography>
        </Box>
      </Box>

      {/* 🎛️ PAINEL DE CONTROLO: PESQUISA E ORDENAÇÃO */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        {/* Barra de Pesquisa */}
        <TextField
          placeholder="Pesquisar agente por nome..."
          variant="outlined"
          size="small"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
            maxWidth: { md: 400 },
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(0,0,0,0.2)",
              "& fieldset": { borderColor: "rgba(149, 106, 217, 0.3)" },
              "&:hover fieldset": { borderColor: "#956AD9" },
              "&.Mui-focused fieldset": { borderColor: "#956AD9" },
            },
            "& .MuiInputBase-input": { color: "white" },
          }}
        />

        {/* Botões de Ordenação */}
        <ToggleButtonGroup
          value={ordenacao}
          exclusive
          onChange={(e, novoValor) => {
            if (novoValor !== null) setOrdenacao(novoValor); // Evita que o botão desmarque se clicado 2x
          }}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              color: "rgba(255,255,255,0.5)",
              borderColor: "rgba(149, 106, 217, 0.3)",
              px: 3,
            },
            "& .Mui-selected": {
              bgcolor: "rgba(149, 106, 217, 0.2) !important",
              color: "#956AD9 !important",
              fontWeight: "bold",
            },
          }}
        >
          <ToggleButton value="xp" aria-label="Ranking XP">
            <EmojiEventsIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
            Ranking XP
          </ToggleButton>
          <ToggleButton value="nome" aria-label="Ordem Alfabética">
            <SortByAlphaIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
            A-Z
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* TABELA DE ALUNOS (VISÃO PÚBLICA) */}
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#1e293b",
          borderRadius: 3,
          border: "1px solid rgba(149, 106, 217, 0.2)",
        }}
      >
        {carregando ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
            <CircularProgress sx={{ color: "#956AD9" }} />
          </Box>
        ) : alunosProcessados.length === 0 ? (
          <Box sx={{ p: 5, textAlign: "center" }}>
            <Typography color="rgba(255,255,255,0.6)">
              Nenhum agente encontrado com esses parâmetros.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "rgba(0,0,0,0.3)" }}>
              <TableRow>
                {/* Mostra um troféu na primeira coluna se for modo Ranking */}
                {ordenacao === "xp" && (
                  <TableCell
                    sx={{ width: 50, textAlign: "center" }}
                  ></TableCell>
                )}
                <TableCell
                  sx={{ color: "rgba(255,255,255,0.7)", fontWeight: "bold" }}
                >
                  Agente
                </TableCell>
                <TableCell
                  sx={{ color: "rgba(255,255,255,0.7)", fontWeight: "bold" }}
                >
                  Guilda
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "rgba(255,255,255,0.7)", fontWeight: "bold" }}
                >
                  Patente (Nível)
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#FFF700", fontWeight: "bold" }}
                >
                  XP Acumulado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alunosProcessados.map((aluno, index) => {
                // Ajuste isso de acordo com a sua ForeignKey real!
                const nomeDaGuilda =
                  aluno.guilda?.nome || aluno.guildas?.nome || "Sem Guilda";

                // Posições de Pódio
                const isTop3 = ordenacao === "xp" && index < 3;
                let corPodio = "transparent";
                if (ordenacao === "xp") {
                  if (index === 0)
                    corPodio = "#FFD700"; // Ouro
                  else if (index === 1)
                    corPodio = "#C0C0C0"; // Prata
                  else if (index === 2) corPodio = "#CD7F32"; // Bronze
                }

                return (
                  <TableRow
                    key={aluno.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        bgcolor: "rgba(149, 106, 217, 0.1) !important",
                      },
                      // Dá um destaque muito leve aos 3 primeiros no ranking
                      bgcolor: isTop3
                        ? `rgba(${index === 0 ? "255,215,0" : index === 1 ? "192,192,192" : "205,127,50"}, 0.05)`
                        : "inherit",
                    }}
                  >
                    {/* COLUNA DO PÓDIO (Só aparece se ordenado por XP) */}
                    {ordenacao === "xp" && (
                      <TableCell align="center">
                        {isTop3 ? (
                          <EmojiEventsIcon sx={{ color: corPodio }} />
                        ) : (
                          <Typography color="rgba(255,255,255,0.3)">
                            {index + 1}º
                          </Typography>
                        )}
                      </TableCell>
                    )}

                    {/* NOME E AVATAR */}
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        color: "white",
                        fontWeight: "medium",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: isTop3
                            ? corPodio
                            : "rgba(149, 106, 217, 0.2)",
                          color: isTop3 ? "black" : "#956AD9",
                          width: 32,
                          height: 32,
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                        }}
                      >
                        {aluno.nome.charAt(0).toUpperCase()}
                      </Avatar>
                      {aluno.nome}
                    </TableCell>

                    {/* GUILDA */}
                    <TableCell>
                      <Chip
                        label={nomeDaGuilda}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 247, 0, 0.1)",
                          color: "#FFF700",
                        }}
                      />
                    </TableCell>

                    {/* NÍVEL / PATENTE */}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <MilitaryTechIcon
                          sx={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "1.2rem",
                          }}
                        />
                        <Typography color="rgba(255,255,255,0.8)">
                          {aluno.nivel || "Recruta"}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* XP */}
                    <TableCell align="center">
                      <Typography fontWeight="bold" color="#FFF700">
                        {aluno.xp_atual || 0} XP
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}
