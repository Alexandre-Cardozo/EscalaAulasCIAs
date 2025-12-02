import { PDFDocument, StandardFonts } from "pdf-lib";
import { getMonth, getYear } from "date-fns";

function centralizaTexto(pagina, palavra, coordenadaX, coordenadaY, tamanho, fonte) {
  const larguraPalavraInicial = fonte.widthOfTextAtSize(palavra, tamanho);
  pagina.drawText(palavra, { x: coordenadaX - larguraPalavraInicial / 2, y: coordenadaY, size: tamanho, font: fonte });
}

function escreveTemplateBebes(
  pagina,
  font,
  dadosBebes,
  diasAulasBebes,
  dadosCriancas,
  diasAulasCriancas,
  dadosIntermediarios,
  diasAulasIntermediarios,
  dadosAdolescentes,
  diasAulasAdolescentes
) {
  centralizaTexto(pagina, diasAulasBebes[0], 67, 665, 13, font);
  centralizaTexto(pagina, diasAulasBebes[1], 67, 645, 13, font);
  centralizaTexto(pagina, diasAulasBebes[2], 67, 625, 13, font);
  centralizaTexto(pagina, diasAulasBebes[3], 67, 605, 13, font);
  centralizaTexto(pagina, diasAulasBebes[4], 67, 585, 13, font);
  centralizaTexto(pagina, diasAulasCriancas[0], 67, 485, 13, font);
  centralizaTexto(pagina, diasAulasCriancas[1], 67, 465, 13, font);
  centralizaTexto(pagina, diasAulasCriancas[2], 67, 445, 13, font);
  centralizaTexto(pagina, diasAulasCriancas[3], 67, 425, 13, font);
  centralizaTexto(pagina, diasAulasCriancas[4], 67, 405, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[0], 67, 305, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[1], 67, 285, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[2], 67, 265, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[3], 67, 245, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[4], 67, 225, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[0], 67, 125, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[1], 67, 105, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[2], 67, 85, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[3], 67, 65, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[4], 67, 45, 13, font);

  centralizaTexto(pagina, dadosBebes[0][0], 345, 665, 13, font);
  centralizaTexto(pagina, dadosBebes[1][0], 345, 645, 13, font);
  centralizaTexto(pagina, dadosBebes[2][0], 345, 625, 13, font);
  centralizaTexto(pagina, dadosBebes[3][0], 345, 605, 13, font);
  centralizaTexto(pagina, dadosBebes[4][0], 345, 585, 13, font);
  centralizaTexto(pagina, dadosCriancas[0][0], 230, 485, 13, font);
  centralizaTexto(pagina, dadosCriancas[1][0], 230, 465, 13, font);
  centralizaTexto(pagina, dadosCriancas[2][0], 230, 445, 13, font);
  centralizaTexto(pagina, dadosCriancas[3][0], 230, 425, 13, font);
  centralizaTexto(pagina, dadosCriancas[4][0], 230, 405, 13, font);
  centralizaTexto(pagina, dadosCriancas[0][1], 460, 485, 13, font);
  centralizaTexto(pagina, dadosCriancas[1][1], 460, 465, 13, font);
  centralizaTexto(pagina, dadosCriancas[2][1], 460, 445, 13, font);
  centralizaTexto(pagina, dadosCriancas[3][1], 460, 425, 13, font);
  centralizaTexto(pagina, dadosCriancas[4][1], 460, 405, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[0][0], 230, 305, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[1][0], 230, 285, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[2][0], 230, 265, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[3][0], 230, 245, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[4][0], 230, 225, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[0][1], 460, 305, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[1][1], 460, 285, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[2][1], 460, 265, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[3][1], 460, 245, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[4][1], 460, 225, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[0][0], 230, 125, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[1][0], 230, 105, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[2][0], 230, 85, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[3][0], 230, 65, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[4][0], 230, 45, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[0][1], 460, 125, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[1][1], 460, 105, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[2][1], 460, 85, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[3][1], 460, 65, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[4][1], 460, 45, 13, font);
}

function escreveTemplatePadrao(
  pagina,
  font,
  dadosCriancas,
  diasAulasCriancas,
  dadosIntermediarios,
  diasAulasIntermediarios,
  dadosAdolescentes,
  diasAulasAdolescentes
) {
  centralizaTexto(pagina, diasAulasCriancas[0], 67, 485, 13, font);
  centralizaTexto(pagina, diasAulasCriancas[1], 67, 465, 13, font);
  centralizaTexto(pagina, diasAulasCriancas[2], 67, 445, 13, font);
  centralizaTexto(pagina, diasAulasCriancas[3], 67, 425, 13, font);
  centralizaTexto(pagina, diasAulasCriancas[4], 67, 405, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[0], 67, 305, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[1], 67, 285, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[2], 67, 265, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[3], 67, 245, 13, font);
  centralizaTexto(pagina, diasAulasIntermediarios[4], 67, 225, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[0], 67, 125, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[1], 67, 105, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[2], 67, 85, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[3], 67, 65, 13, font);
  centralizaTexto(pagina, diasAulasAdolescentes[4], 67, 45, 13, font);

  centralizaTexto(pagina, dadosCriancas[0][0], 230, 485, 13, font);
  centralizaTexto(pagina, dadosCriancas[1][0], 230, 465, 13, font);
  centralizaTexto(pagina, dadosCriancas[2][0], 230, 445, 13, font);
  centralizaTexto(pagina, dadosCriancas[3][0], 230, 425, 13, font);
  centralizaTexto(pagina, dadosCriancas[4][0], 230, 405, 13, font);
  centralizaTexto(pagina, dadosCriancas[0][1], 460, 485, 13, font);
  centralizaTexto(pagina, dadosCriancas[1][1], 460, 465, 13, font);
  centralizaTexto(pagina, dadosCriancas[2][1], 460, 445, 13, font);
  centralizaTexto(pagina, dadosCriancas[3][1], 460, 425, 13, font);
  centralizaTexto(pagina, dadosCriancas[4][1], 460, 405, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[0][0], 230, 305, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[1][0], 230, 285, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[2][0], 230, 265, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[3][0], 230, 245, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[4][0], 230, 225, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[0][1], 460, 305, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[1][1], 460, 285, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[2][1], 460, 265, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[3][1], 460, 245, 13, font);
  centralizaTexto(pagina, dadosIntermediarios[4][1], 460, 225, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[0][0], 230, 125, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[1][0], 230, 105, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[2][0], 230, 85, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[3][0], 230, 65, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[4][0], 230, 45, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[0][1], 460, 125, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[1][1], 460, 105, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[2][1], 460, 85, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[3][1], 460, 65, 13, font);
  centralizaTexto(pagina, dadosAdolescentes[4][1], 460, 45, 13, font);
}

export async function gerarPDF(
  isBebesOn,
  dataSelecionada,
  diasAulasBebes,
  diasAulasCriancas,
  diasAulasIntermediarios,
  diasAulasAdolescentes,
  dadosBebes,
  dadosCriancas,
  dadosIntermediarios,
  dadosAdolescentes
) {
  // Define o PDF template
  const pdfTemplatePath = `${import.meta.env.BASE_URL}${isBebesOn ? "/templatebebes.pdf" : "/templatepadrao.pdf"}`;

  // Carrega o PDF template
  const response = await fetch(pdfTemplatePath);
  if (!response.ok) {
    throw new Error("Erro carregando PDF: " + response.status);
  }
  const existingPdfBytes = await response.arrayBuffer();

  /* console.log("BASE_URL:", import.meta.env.BASE_URL);
  console.log("PDF PATH:", pdfTemplatePath); */

  // Carrega o documento PDF
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Define a fonte
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Obtém a página onde o texto será desenhado
  const page = pdfDoc.getPages()[0];

  // Escreve o informativo da data da escala
  page.drawText(
    dataSelecionada.toLocaleDateString("pt-BR", { month: "long" }).toUpperCase() + " de " + getYear(dataSelecionada),
    { x: 19, y: isBebesOn ? 740 : 560, size: 15, font }
  );

  isBebesOn
    ? escreveTemplateBebes(
        page,
        font,
        dadosBebes,
        diasAulasBebes,
        dadosCriancas,
        diasAulasCriancas,
        dadosIntermediarios,
        diasAulasIntermediarios,
        dadosAdolescentes,
        diasAulasAdolescentes
      )
    : escreveTemplatePadrao(
        page,
        font,
        dadosCriancas,
        diasAulasCriancas,
        dadosIntermediarios,
        diasAulasIntermediarios,
        dadosAdolescentes,
        diasAulasAdolescentes
      );

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
}
