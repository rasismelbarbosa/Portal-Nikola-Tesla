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
  MenuItem,
  TextField,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ModalJustificativa from "@/components/ModalJustificativa";

export default function CadastroFrequenciaPage() {
  const router = useRouter();
  const supabase = createClient();

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  const [aulaSelecionada, setAulaSelecionada] = useState("");
  const [aulas, setAulas] = useState<any[]>([]);
  const [alunos, setAlunos] = useState<any[]>([]);
  const [frequencia, setFrequencia] = useState<Record<string, string>>({});

  // Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [alunosParaJustificar, setAlunosParaJustificar] = useState<any[]>([]);

  useEffect(() => {
    const carregarDados = async () => {
      const { data: dataAulas } = await supabase
        .from("aulas")
        .select("id, data_aula, tema")
        .order("data_aula", { ascending: false });

      if (dataAulas) setAulas(dataAulas);

      const { data: dataAlunos } = await supabase
        .from("alunos")
        .select("id, nome, turma")
        .order("nome", { ascending: true });

      if (dataAlunos) {
        setAlunos(dataAlunos);
        const frequenciaPadrao: Record<string, string> = {};
        dataAlunos.forEach((aluno) => {
          frequenciaPadrao[aluno.id] = "Presente";
        });
        setFrequencia(frequenciaPadrao);
      }
    };
    carregarDados();
  }, [supabase]);

  const handleFrequenciaChange = (
    alunoId: string,
    novoStatus: string | null,
  ) => {
    if (novoStatus !== null) {
      setFrequencia((prev) => ({ ...prev, [alunoId]: novoStatus }));
    }
  };

  // 1. O botão "Salvar" agora dispara esta função para verificar as justificativas
  const iniciarSalvamento = () => {
    if (!aulaSelecionada) {
      setMensagem({
        tipo: "error",
        texto: "Selecione uma aula antes de salvar.",
      });
      return;
    }

    // Filtra quem está com "Justificado"
    const justificados = alunos.filter(
      (aluno) => frequencia[aluno.id] === "Justificado",
    );

    if (justificados.length > 0) {
      // Se tiver alguém, abre o modal
      setAlunosParaJustificar(justificados);
      setModalOpen(true);
    } else {
      // Se não tiver ninguém justificado, salva direto (passando um objeto vazio)
      executarSalvamentoNoBanco({});
    }
  };

  // 2. A função real que envia os dados para o Supabase
  // 2. A função real que envia os dados e CALCULA A FREQUÊNCIA por debaixo dos panos
  const executarSalvamentoNoBanco = async (
    textosJustificativa: Record<string, string>,
  ) => {
    setModalOpen(false); // Fecha o modal (se estivesse aberto)
    setCarregando(true);
    setMensagem({ tipo: "", texto: "" });

    // A. Prepara a chamada do dia
    const dadosParaInserir = alunos.map((aluno) => ({
      aula_id: aulaSelecionada,
      aluno_id: aluno.id,
      status: frequencia[aluno.id],
      justificativa: textosJustificativa[aluno.id] || null,
    }));

    // B. Salva a chamada no banco
    const { error } = await supabase
      .from("frequencias")
      .insert(dadosParaInserir);

    if (error) {
      console.error(error);
      setMensagem({
        tipo: "error",
        texto:
          "Erro ao salvar a chamada. Pode já existir um registo para esta aula.",
      });
      setCarregando(false);
      return;
    }

    // C. O MOTOR SECRETO: Atualizando a porcentagem de cada aluno
    // Busca TODAS as frequências de todas as aulas já registadas
    const { data: todasFrequencias } = await supabase
      .from("frequencias")
      .select("aluno_id, status");

    if (todasFrequencias) {
      // Faz o cálculo matemático para cada aluno da lista
      for (const aluno of alunos) {
        // Pega apenas as presenças/faltas deste aluno específico
        const freqsDoAluno = todasFrequencias.filter(
          (f) => f.aluno_id === aluno.id,
        );
        const totalAulas = freqsDoAluno.length;

        if (totalAulas > 0) {
          // Consideramos "Presente" e "Justificado" como positivos para não baixar a nota
          const presencas = freqsDoAluno.filter(
            (f) => f.status === "Presente" || f.status === "Justificado",
          ).length;

          // Regra de 3 simples para achar a porcentagem e arredondar (ex: 85%)
          const porcentagemCalculada = Math.round(
            (presencas / totalAulas) * 100,
          );

          // Salva sorrateiramente na tabela 'alunos'
          await supabase
            .from("alunos")
            .update({ frequencia: porcentagemCalculada })
            .eq("id", aluno.id);
        }
      }
    }

    setMensagem({
      tipo: "success",
      texto: "Chamada salva e porcentagens atualizadas com sucesso!",
    });
    setTimeout(() => router.push("/painel-professor/turmas"), 2000);
    setCarregando(false);
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
      "&:hover fieldset": { borderColor: "rgba(149, 106, 217, 0.5)" },
      "&.Mui-focused fieldset": { borderColor: "#956AD9" },
    },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiSelect-icon": { color: "white" },
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", pb: 5 }}>
      {/* ... CABEÇALHO E FILTRO DE AULA PERMANECEM IGUAIS ... */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Button
          component={Link}
          href="/painel-professor/turmas"
          startIcon={<ArrowBackIcon />}
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          Voltar
        </Button>
        <Typography variant="h4" fontWeight="bold" color="white">
          Lançar Frequência
        </Typography>
      </Box>

      <Paper
        sx={{
          bgcolor: "#1e293b",
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid rgba(149, 106, 217, 0.2)",
        }}
      >
        {mensagem.texto && (
          <Alert
            severity={mensagem.tipo as any}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            {mensagem.texto}
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              select
              label="Selecione a Aula"
              value={aulaSelecionada}
              onChange={(e) => setAulaSelecionada(e.target.value)}
              sx={textFieldStyle}
            >
              {aulas.length === 0 ? (
                <MenuItem disabled value="">
                  Nenhuma aula cadastrada
                </MenuItem>
              ) : (
                aulas.map((aula) => (
                  <MenuItem key={aula.id} value={aula.id}>
                    {new Date(aula.data_aula).toLocaleDateString("pt-PT")} -{" "}
                    {aula.tema}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* LISTA DE CHAMADA INTELIGENTE */}
      {aulaSelecionada && alunos.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: "#1e293b",
            borderRadius: 3,
            border: "1px solid rgba(149, 106, 217, 0.2)",
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "rgba(0,0,0,0.3)" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Nome do Aluno
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Status de Presença
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alunos.map((aluno) => (
                <TableRow
                  key={aluno.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ color: "white", fontWeight: "medium" }}>
                    {aluno.nome}
                    {aluno.turma && (
                      <Chip
                        label={aluno.turma}
                        size="small"
                        sx={{
                          ml: 2,
                          bgcolor: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.7rem",
                          height: 20,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <ToggleButtonGroup
                      value={frequencia[aluno.id]}
                      exclusive
                      onChange={(e, novoStatus) =>
                        handleFrequenciaChange(aluno.id, novoStatus)
                      }
                      size="small"
                      sx={{
                        "& .MuiToggleButton-root": {
                          color: "rgba(255,255,255,0.5)",
                          borderColor: "rgba(255,255,255,0.2)",
                          py: 0.5,
                        },
                        "& .Mui-selected": { fontWeight: "bold" },
                      }}
                    >
                      <ToggleButton
                        value="Presente"
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "rgba(47, 158, 65, 0.2)",
                            color: "#2F9E41 !important",
                            borderColor: "#2F9E41",
                          },
                        }}
                      >
                        Presente
                      </ToggleButton>
                      <ToggleButton
                        value="Falta"
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "rgba(205, 25, 30, 0.2)",
                            color: "#CD191E !important",
                            borderColor: "#CD191E",
                          },
                        }}
                      >
                        Falta
                      </ToggleButton>
                      <ToggleButton
                        value="Justificado"
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "rgba(255, 247, 0, 0.2)",
                            color: "#FFF700 !important",
                            borderColor: "#FFF700",
                          },
                        }}
                      >
                        Justificado
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* BOTÃO FINAL QUE DISPARA A VERIFICAÇÃO */}
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "flex-end",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={iniciarSalvamento} // Mudou de handleSalvarChamada para iniciarSalvamento
              disabled={carregando}
              startIcon={
                carregando ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SaveIcon />
                )
              }
              sx={{
                bgcolor: "#2F9E41",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "#237a32" },
              }}
            >
              {carregando ? "Salvando..." : "Salvar Chamada"}
            </Button>
          </Box>
        </TableContainer>
      )}

      {/* O MODAL INVISÍVEL ATÉ SER CHAMADO */}
      <ModalJustificativa
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        alunos={alunosParaJustificar}
        onConfirm={executarSalvamentoNoBanco}
      />
    </Box>
  );
}
