import PageHeader from "./components/PageHeader.jsx";
import EscalaTable from "./components/EscalaTable.jsx";
import { useState, useEffect } from "react";
import { getMonth, getYear, getDaysInMonth, format } from "date-fns";
import { gerarPDF } from "./GeneratePdf.jsx";
import { Snackbar, Alert } from "@mui/material";

export default function App() {
  // --- O "Estado" (memória) do React ---
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [domingos, setDomingos] = useState([]);
  const [domingosPdf, setDomingosPdf] = useState([]);
  const [isBebesOn, setIsBebesOn] = useState(true);

  // Arrays de nomes: sempre 5 linhas x 2 colunas (strings)
  const [nomesBebes, setNomesBebes] = useState(Array.from({ length: 5 }, () => ["", ""]));
  const [nomesCriancas, setNomesCriancas] = useState(Array.from({ length: 5 }, () => ["", ""]));
  const [nomesIntermediarios, setNomesIntermediarios] = useState(Array.from({ length: 5 }, () => ["", ""]));
  const [nomesAdolescentes, setNomesAdolescentes] = useState(Array.from({ length: 5 }, () => ["", ""]));

  // Handler genérico para atualizar uma célula [linha, coluna]
  const makeChangeHandler = (setter) => (rowIndex, colIndex, value) => {
    setter((prev) => {
      const next = prev.map((cols) => [...cols]);
      next[rowIndex][colIndex] = value;
      return next;
    });
  };

  const onChangeBebes = makeChangeHandler(setNomesBebes);
  const onChangeCriancas = makeChangeHandler(setNomesCriancas);
  const onChangeIntermediarios = makeChangeHandler(setNomesIntermediarios);
  const onChangeAdolescentes = makeChangeHandler(setNomesAdolescentes);

  // --- Lógica para recalcular os domingos ---
  // Roda toda vez que 'dataSelecionada' mudar
  useEffect(() => {
    const ano = getYear(dataSelecionada);
    const mes = getMonth(dataSelecionada); // 0-11

    const novosDomingos = [];
    const diasNoMes = getDaysInMonth(dataSelecionada);

    // Adiciona os domingos do mês atual ao array
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataAtual = new Date(ano, mes, dia);
      if (dataAtual.getDay() === 0) {
        // 0 = Domingo
        novosDomingos.push(format(dataAtual, "dd/MM/yyyy"));
      }
    }
    setDomingos(novosDomingos);
    
    // Garante que o array de domingosPdf tenha sempre 5 registros
    const domingosPdfPreenchido = [...novosDomingos]; // Cria uma cópia
    while (domingosPdfPreenchido.length < 5) {
      domingosPdfPreenchido.push("");
    }
    setDomingosPdf(domingosPdfPreenchido);
  }, [dataSelecionada]); // "Dependência": rode quando isso mudar

  // Handler que recebe o clique e chama o gerarPDF com todos os dados
  const handleGerarPdfRequest = async (isBebesOn) => {
    try {
      await gerarPDF(isBebesOn, dataSelecionada, domingosPdf, nomesBebes, nomesCriancas, nomesIntermediarios, nomesAdolescentes);
    } catch (err) {
      console.error("Falha ao gerar PDF:", err);
      setAppSnackbarMessage("Erro ao gerar PDF!");
      setAppSnackbarSeverity("error");
      setAppSnackbarOpen(true);
    }
  };

  // Estados para o Snackbar de erro no App.jsx
  const [appSnackbarOpen, setAppSnackbarOpen] = useState(false);
  const [appSnackbarMessage, setAppSnackbarMessage] = useState("");
  const [appSnackbarSeverity, setAppSnackbarSeverity] = useState("error"); // 'success', 'error', 'warning', 'info'

  const handleAppSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAppSnackbarOpen(false);
  };

  return (
    <>
      <PageHeader
        dataSelecionada={dataSelecionada}
        setDataSelecionada={setDataSelecionada}
        isBebesOn={isBebesOn}
        setIsBebesOn={setIsBebesOn}
        onGerarPdf={handleGerarPdfRequest}
      />
      {isBebesOn ? (
        <EscalaTable
          domingos={domingos}
          cor="#65C466"
          titulo="Bebês"
          variant="bebes"
          nomesTabela={nomesBebes}
          onChangeNome={onChangeBebes}
        />
      ) : null}
      <EscalaTable
        domingos={domingos}
        cor="#D24239"
        titulo="Crianças"
        variant="padrao"
        nomesTabela={nomesCriancas}
        onChangeNome={onChangeCriancas}
      />
      <EscalaTable
        domingos={domingos}
        cor="#436CDD"
        titulo="Intermediários"
        variant="padrao"
        nomesTabela={nomesIntermediarios}
        onChangeNome={onChangeIntermediarios}
      />
      <EscalaTable
        domingos={domingos}
        cor="#F0C035"
        titulo="Adolescentes"
        variant="padrao"
        nomesTabela={nomesAdolescentes}
        onChangeNome={onChangeAdolescentes}
      />
      {/* Snackbar para erros no App.jsx */}
      <Snackbar
        open={appSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleAppSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleAppSnackbarClose} severity={appSnackbarSeverity} sx={{ width: "100%" }}>
          {appSnackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
