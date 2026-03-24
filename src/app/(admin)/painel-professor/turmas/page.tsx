"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ResumoAlunoModal from "@/components/ResumoAlunoModal";
import { createClient } from "@/utils/supabase/client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DownloadIcon from "@mui/icons-material/Download";

export default function TurmasPage() {
  const supabase = createClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<any>(null);

  // Estados para os dados reais
  const [alunos, setAlunos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Busca os alunos reais no Supabase assim que a página carrega
  useEffect(() => {
    const buscarAlunos = async () => {
      const { data, error } = await supabase
        .from("alunos")
        .select("*")
        .order("nome", { ascending: true }); // Ordena por ordem alfabética

      if (error) {
        console.error("Erro ao buscar alunos:", error);
      } else if (data) {
        setAlunos(data);
      }
      setCarregando(false);
    };

    buscarAlunos();
  }, [supabase]);

  const abrirModal = (aluno: any) => {
    setAlunoSelecionado(aluno);
    setModalOpen(true);
  };

  const exportarPlanilha = async () => {
    try {
      // 1. Busca os dados
      const { data: alunosData } = await supabase
        .from("alunos")
        .select("id, nome, frequencia")
        .order("nome", { ascending: true });
      const { data: aulasData } = await supabase
        .from("aulas")
        .select("id, data_aula")
        .order("data_aula", { ascending: true });
      const { data: frequenciasData } = await supabase
        .from("frequencias")
        .select("*");

      if (!alunosData || !aulasData || !frequenciasData) return;

      // 2. Monta o Cabeçalho (Nomes, Data1, Data2, ..., Frequência Final)
      const cabecalho = ["Nome do Aluno"];
      aulasData.forEach((aula) => {
        cabecalho.push(new Date(aula.data_aula).toLocaleDateString("pt-PT"));
      });
      cabecalho.push("Frequência Geral (%)");

      // 3. Monta as Linhas (Um aluno por linha com True/False)
      const linhas = alunosData.map((aluno) => {
        const linha = [aluno.nome];

        aulasData.forEach((aula) => {
          // Procura se o aluno tem registo nesta aula específica
          const reg = frequenciasData.find(
            (f) => f.aluno_id === aluno.id && f.aula_id === aula.id,
          );

          if (!reg) {
            linha.push("-"); // Se não houver registo ainda
          } else if (
            reg.status === "Presente" ||
            reg.status === "Justificado"
          ) {
            linha.push("TRUE"); // Presente ou Justificado fica como TRUE (como na sua planilha)
          } else {
            linha.push("FALSE"); // Falta fica como FALSE
          }
        });

        linha.push(`${aluno.frequencia || 0}%`);
        return linha.join(","); // Junta a linha com vírgulas
      });

      // 4. Junta o cabeçalho com as linhas
      const csvContent = cabecalho.join(",") + "\n" + linhas.join("\n");

      // 5. Força o download do ficheiro
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Chamada_Tesla_${new Date().toISOString().split("T")[0]}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao exportar planilha:", error);
      alert("Erro ao gerar o relatório.");
    }
  };

  return (
    <Box>
      {/* CABEÇALHO E BOTÕES DE AÇÃO */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { md: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="white">
          Gestão de Turmas
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            href="/painel-professor/turmas/cadastro-aula"
            variant="contained"
            startIcon={<AddBoxIcon />}
            sx={{
              bgcolor: "#956AD9",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#7a52b3" },
            }}
          >
            Cadastrar Aula
          </Button>
          <Button
            component={Link}
            href="/painel-professor/turmas/cadastro-frequencia"
            variant="contained"
            startIcon={<ChecklistRtlIcon />}
            sx={{
              bgcolor: "#2F9E41",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#237a32" },
            }}
          >
            Lançar Frequência
          </Button>

          <Button
            onClick={exportarPlanilha}
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              fontWeight: "bold",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Exportar CSV
          </Button>
        </Box>
      </Box>

      {/* TABELA DE ALUNOS */}
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
        ) : alunos.length === 0 ? (
          <Box sx={{ p: 5, textAlign: "center" }}>
            <Typography color="rgba(255,255,255,0.6)">
              Nenhum aluno encontrado no banco de dados.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "rgba(0,0,0,0.3)" }}>
              <TableRow>
                <TableCell
                  sx={{ color: "rgba(255,255,255,0.7)", fontWeight: "bold" }}
                >
                  Aluno
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
                  Média
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "rgba(255,255,255,0.7)", fontWeight: "bold" }}
                >
                  Frequência
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alunos.map((aluno) => {
                // Prevenção caso o aluno ainda não tenha notas ou frequência calculada no BD
                const media = aluno.media || 0;
                const frequencia = aluno.frequencia || 100;

                return (
                  <TableRow
                    key={aluno.id}
                    hover
                    onClick={() => abrirModal(aluno)}
                    sx={{
                      cursor: "pointer",
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        bgcolor: "rgba(149, 106, 217, 0.1) !important",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "white", fontWeight: "medium" }}>
                      {aluno.nome}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={aluno.guilda || "Sem Guilda"}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 247, 0, 0.1)",
                          color: "#FFF700",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontWeight="bold"
                        color={media >= 60 ? "#2F9E41" : "#CD191E"}
                      >
                        {media}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontWeight="bold"
                        color={frequencia >= 75 ? "#2F9E41" : "#CD191E"}
                      >
                        {frequencia}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* COMPONENTE DO MODAL */}
      <ResumoAlunoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aluno={alunoSelecionado}
      />
    </Box>
  );
}
