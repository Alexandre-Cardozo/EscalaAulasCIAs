import PageHeader from "./components/PageHeader.jsx";
import EscalaTable from "./components/EscalaTable.jsx";
import { useState, useEffect } from "react";
import { getMonth, getYear, getDaysInMonth, format } from "date-fns";

export default function App() {
  // --- O "Estado" (memória) do React ---
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [domingos, setDomingos] = useState([]);
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

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataAtual = new Date(ano, mes, dia);
      if (dataAtual.getDay() === 0) {
        // 0 = Domingo
        novosDomingos.push(format(dataAtual, "dd/MM/yyyy"));
      }
    }
    setDomingos(novosDomingos);
  }, [dataSelecionada]); // "Dependência": rode quando isso mudar

  // Nomes dos meses para o seletor
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <>
      <PageHeader
        meses={meses}
        dataSelecionada={dataSelecionada}
        setDataSelecionada={setDataSelecionada}
        isBebesOn={isBebesOn}
        setIsBebesOn={setIsBebesOn}
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
    </>
  );
}
