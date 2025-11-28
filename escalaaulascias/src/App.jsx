import PageHeader from "./components/PageHeader.jsx";
import EscalaTable from "./components/EscalaTable.jsx";
import { useState, useEffect, useRef } from "react";
import { getMonth, getYear, getDaysInMonth, format } from "date-fns";
import { gerarPDF } from "./GeneratePdf.jsx";
import { Snackbar, Alert } from "@mui/material";
import usePersistentState from "./states/LocalPersistence.jsx";

export default function App() {
  /* -----------------------------
   * ESTADOS PERSISTENTES
   * ----------------------------- */

  const [dataSelecionada, setDataSelecionada] = usePersistentState("dataSelecionada", new Date());

  const [isBebesOn, setIsBebesOn] = usePersistentState("isBebesOn", true);

  const [nomesBebes, setNomesBebes] = usePersistentState(
    "nomesBebes",
    Array.from({ length: 5 }, () => ["", ""])
  );

  const [nomesCriancas, setNomesCriancas] = usePersistentState(
    "nomesCriancas",
    Array.from({ length: 5 }, () => ["", ""])
  );

  const [nomesIntermediarios, setNomesIntermediarios] = usePersistentState(
    "nomesIntermediarios",
    Array.from({ length: 5 }, () => ["", ""])
  );

  const [nomesAdolescentes, setNomesAdolescentes] = usePersistentState(
    "nomesAdolescentes",
    Array.from({ length: 5 }, () => ["", ""])
  );

  const prevMonthYear = useRef({ month: null, year: null });

  /* -----------------------------
   * Converter string → Date ao carregar do JSON
   * ----------------------------- */
  useEffect(() => {
    if (typeof dataSelecionada === "string") {
      const parsedDate = new Date(dataSelecionada);
      setDataSelecionada(parsedDate);
      prevMonthYear.current = { month: getMonth(parsedDate), year: getYear(parsedDate) };
    } else {
      prevMonthYear.current = { month: getMonth(dataSelecionada), year: getYear(dataSelecionada) };
    }
  }, []);

  /* -----------------------------
   * DOMINGOS (não persistente)
   * ----------------------------- */
  const [domingos, setDomingos] = useState([]);
  const [domingosPdf, setDomingosPdf] = useState([]);

  /* -----------------------------
   * Gera domingos da data selecionada e atualiza estados
   * ----------------------------- */
  useEffect(() => {
    const ano = getYear(dataSelecionada);
    const mes = getMonth(dataSelecionada);

    // Verifica se o mês ou o ano mudaram
    if (
      prevMonthYear.current.month !== mes ||
      prevMonthYear.current.year !== ano
    ) {
      // RESETAR NOMES ao trocar mês/ano
      setNomesBebes(Array.from({ length: 5 }, () => ["", ""]));
      setNomesCriancas(Array.from({ length: 5 }, () => ["", ""]));
      setNomesIntermediarios(Array.from({ length: 5 }, () => ["", ""]));
      setNomesAdolescentes(Array.from({ length: 5 }, () => ["", ""]));
    }

    // Atualiza o ref com o mês e ano atuais
    prevMonthYear.current = { month: mes, year: ano };

    const novosDomingos = [];
    const diasNoMes = getDaysInMonth(dataSelecionada);

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataAtual = new Date(ano, mes, dia);
      if (dataAtual.getDay() === 0) {
        novosDomingos.push(format(dataAtual, "dd/MM/yyyy"));
      }
    }

    setDomingos(novosDomingos);

    // Completar até 5 posições para PDF
    const pdf = [...novosDomingos];
    while (pdf.length < 5) pdf.push("");
    setDomingosPdf(pdf);
  }, [dataSelecionada]);

  /* -----------------------------
   * Handler para atualizar nomes ao mudar input
   * ----------------------------- */
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

  /* -----------------------------
   * GERAR PDF
   * ----------------------------- */
  const handleGerarPdfRequest = async (isBebesOn) => {
    try {
      await gerarPDF(
        isBebesOn,
        dataSelecionada,
        domingosPdf,
        nomesBebes,
        nomesCriancas,
        nomesIntermediarios,
        nomesAdolescentes
      );
    } catch (err) {
      console.error("Falha ao gerar PDF:", err);
      setAppSnackbarMessage("Erro ao gerar PDF!");
      setAppSnackbarSeverity("error");
      setAppSnackbarOpen(true);
    }
  };

  /* -----------------------------
   * SNACKBAR
   * ----------------------------- */
  const [appSnackbarOpen, setAppSnackbarOpen] = useState(false);
  const [appSnackbarMessage, setAppSnackbarMessage] = useState("");
  const [appSnackbarSeverity, setAppSnackbarSeverity] = useState("error");

  const handleAppSnackbarClose = (reason) => {
    if (reason === "clickaway") return;
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

      {isBebesOn && (
        <EscalaTable
          domingos={domingos}
          cor="#65C466"
          titulo="Bebês"
          variant="bebes"
          nomesTabela={nomesBebes}
          onChangeNome={onChangeBebes}
        />
      )}

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

      <Snackbar
        open={appSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleAppSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={appSnackbarSeverity} onClose={handleAppSnackbarClose}>
          {appSnackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
