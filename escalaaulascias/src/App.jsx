import Header from "./components/Header.jsx";
import { useState, useEffect } from "react";
import { getMonth, getYear, getDaysInMonth, format } from "date-fns";

export default function App() {
  // --- O "Estado" (memória) do React ---
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [domingos, setDomingos] = useState([]);

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

    // NOTA: Aqui você também precisará de estados para guardar
    // os nomes das professoras. Ex:
    // const [nomes03, setNomes03] = useState({});
  }, [dataSelecionada]); // "Dependência": rode quando isso mudar

  return (
    <div>
      <Header
        meses={meses}
        dataSelecionada={dataSelecionada}
        setDataSelecionada={setDataSelecionada}
      />
    </div>
  );
}
