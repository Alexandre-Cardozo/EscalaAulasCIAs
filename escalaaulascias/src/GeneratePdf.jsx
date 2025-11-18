import { PDFDocument, StandardFonts } from "pdf-lib";
import { getMonth, getYear, getDaysInMonth, format } from "date-fns";

export async function gerarPDF(
  isBebesOn,
  dataSelecionada,
  domingos,
  dadosBebes,
  dadosCrancas,
  dadosIntermediarios,
  dadosAdolescentes
) {
  console.log("escala_cias_" + getMonth(dataSelecionada) + "_" + getYear(dataSelecionada) + ".pdf");
  console.log(
    "Escala " +
      dataSelecionada.toLocaleDateString("pt-BR", { month: "long" }).toUpperCase() +
      " de " +
      getYear(dataSelecionada)
  );

  {
    /*Comçando a criação do PDF */
  }
  console.log("Comçando a criação do PDF...");

  console.log("Bebês:");
  for (let i = 0; i < domingos.length; i++) {
    console.log(domingos[i]);
    console.log(dadosBebes[i][0]);
  }

  console.log("Crianças:");
  for (let i = 0; i < domingos.length; i++) {
    console.log(domingos[i]);
    console.log(dadosCrancas[i][0]);
    console.log(dadosCrancas[i][1]);
  }

  console.log("Intermediários:");
  for (let i = 0; i < domingos.length; i++) {
    console.log(domingos[i]);
    console.log(dadosIntermediarios[i][0]);
    console.log(dadosIntermediarios[i][1]);
  }

  console.log("Adolescentes:");
  for (let i = 0; i < domingos.length; i++) {
    console.log(domingos[i]);
    console.log(dadosAdolescentes[i][0]);
    console.log(dadosAdolescentes[i][1]);
  }

  // Define o PDF template
  const pdfTemplatePath = isBebesOn
    ? import.meta.env.BASE_URL + "templatebebes.pdf"
    : import.meta.env.BASE_URL + "templatepadrao.pdf";

  // Carrega o PDF template
  const existingPdfBytes = await fetch(pdfTemplatePath).then((res) => {
    return res.arrayBuffer();
  });

  //Carrega o documento PDF
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Define a fonte
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  //Obtém a página onde o texto será desenhado
  const page = pdfDoc.getPages()[0];

  // 5. Escreve os dados
  isBebesOn ? page.drawText(dadosBebes[0][0], { x: 120, y: 680, size: 12, font }) : null;

  //Gera o PDF final
  const pdfBytes = await pdfDoc.save();

  /* // Faz o download no navegador
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "escala_cias_" + getYear(dataSelecionada) + "_" + getMonth(dataSelecionada) + ".pdf";
  a.click(); */

  // Abre o PDF em uma nova aba para pré-visualização
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  console.log("URL de pré-visualização do PDF:", url);
}
