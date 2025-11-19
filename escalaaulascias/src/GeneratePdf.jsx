import { PDFDocument, StandardFonts } from "pdf-lib";
import { getMonth, getYear, getDaysInMonth, format } from "date-fns";

function centralizaTexto(pagina, palavra, coordenadaX, coordenadaY, tamanho, fonte) {
  const larguraPalavraInicial = fonte.widthOfTextAtSize(palavra, tamanho);
  pagina.drawText(palavra, { x: coordenadaX - larguraPalavraInicial / 2, y: coordenadaY, size: tamanho, font: fonte });
}

export async function gerarPDF(
  isBebesOn,
  dataSelecionada,
  domingos,
  dadosBebes,
  dadosCriancas,
  dadosIntermediarios,
  dadosAdolescentes
) {
  // Define o PDF template
  const pdfTemplatePath = isBebesOn
    ? import.meta.env.BASE_URL + "templatebebes.pdf"
    : import.meta.env.BASE_URL + "templatepadrao.pdf";

  // Carrega o PDF template
  const existingPdfBytes = await fetch(pdfTemplatePath).then((res) => {
    return res.arrayBuffer();
  });

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

  // Escreve os dados das datas
  page.drawText(domingos[0], { x: 35, y: isBebesOn ? 665 : 485, size: 13, font });
  page.drawText(domingos[1], { x: 35, y: isBebesOn ? 645 : 465, size: 13, font });
  page.drawText(domingos[2], { x: 35, y: isBebesOn ? 625 : 445, size: 13, font });
  page.drawText(domingos[3], { x: 35, y: isBebesOn ? 605 : 425, size: 13, font });
  page.drawText(domingos[4], { x: 35, y: isBebesOn ? 585 : 405, size: 13, font });
  //
  page.drawText(domingos[0], { x: 35, y: isBebesOn ? 485 : 305, size: 13, font });
  page.drawText(domingos[1], { x: 35, y: isBebesOn ? 465 : 285, size: 13, font });
  page.drawText(domingos[2], { x: 35, y: isBebesOn ? 445 : 265, size: 13, font });
  page.drawText(domingos[3], { x: 35, y: isBebesOn ? 425 : 245, size: 13, font });
  page.drawText(domingos[4], { x: 35, y: isBebesOn ? 405 : 225, size: 13, font });
  //
  page.drawText(domingos[0], { x: 35, y: isBebesOn ? 305 : 125, size: 13, font });
  page.drawText(domingos[1], { x: 35, y: isBebesOn ? 285 : 105, size: 13, font });
  page.drawText(domingos[2], { x: 35, y: isBebesOn ? 265 : 85, size: 13, font });
  page.drawText(domingos[3], { x: 35, y: isBebesOn ? 245 : 65, size: 13, font });
  page.drawText(domingos[4], { x: 35, y: isBebesOn ? 225 : 45, size: 13, font });
  //
  if (isBebesOn) {
    page.drawText(domingos[0], { x: 35, y: 125, size: 13, font });
    page.drawText(domingos[1], { x: 35, y: 105, size: 13, font });
    page.drawText(domingos[2], { x: 35, y: 85, size: 13, font });
    page.drawText(domingos[3], { x: 35, y: 65, size: 13, font });
    page.drawText(domingos[4], { x: 35, y: 45, size: 13, font });
  }

  // Escreve os dados preenchidos
  isBebesOn
    ? centralizaTexto(page, dadosBebes[0][0], 345, 665, 13, font)
    : (centralizaTexto(page, dadosCriancas[0][0], 230, 485, 13, font),
      centralizaTexto(page, dadosCriancas[0][1], 460, 485, 13, font));
  isBebesOn
    ? centralizaTexto(page, dadosBebes[1][0], 345, 645, 13, font)
    : (centralizaTexto(page, dadosCriancas[1][0], 230, 465, 13, font),
      centralizaTexto(page, dadosCriancas[1][1], 460, 465, 13, font));
  isBebesOn
    ? centralizaTexto(page, dadosBebes[2][0], 345, 625, 13, font)
    : (centralizaTexto(page, dadosCriancas[2][0], 230, 445, 13, font),
      centralizaTexto(page, dadosCriancas[2][1], 460, 445, 13, font));
  isBebesOn
    ? centralizaTexto(page, dadosBebes[3][0], 345, 605, 13, font)
    : (centralizaTexto(page, dadosCriancas[3][0], 230, 425, 13, font),
      centralizaTexto(page, dadosCriancas[3][1], 460, 425, 13, font));
  domingos[4] != ""
    ? isBebesOn
      ? centralizaTexto(page, dadosBebes[4][0], 345, 585, 13, font)
      : (centralizaTexto(page, dadosCriancas[4][0], 230, 405, 13, font),
        centralizaTexto(page, dadosCriancas[4][1], 460, 405, 13, font))
    : null;

  //
  isBebesOn
    ? (centralizaTexto(page, dadosCriancas[0][0], 230, 485, 13, font),
      centralizaTexto(page, dadosCriancas[0][1], 460, 485, 13, font))
    : (centralizaTexto(page, dadosIntermediarios[0][0], 230, 305, 13, font),
      centralizaTexto(page, dadosIntermediarios[0][1], 460, 305, 13, font));
  isBebesOn
    ? (centralizaTexto(page, dadosCriancas[1][0], 230, 465, 13, font),
      centralizaTexto(page, dadosCriancas[1][1], 460, 465, 13, font))
    : (centralizaTexto(page, dadosIntermediarios[1][0], 230, 285, 13, font),
      centralizaTexto(page, dadosIntermediarios[1][1], 460, 285, 13, font));
  isBebesOn
    ? (centralizaTexto(page, dadosCriancas[2][0], 230, 445, 13, font),
      centralizaTexto(page, dadosCriancas[2][1], 460, 445, 13, font))
    : (centralizaTexto(page, dadosIntermediarios[2][0], 230, 265, 13, font),
      centralizaTexto(page, dadosIntermediarios[2][1], 460, 265, 13, font));
  isBebesOn
    ? (centralizaTexto(page, dadosCriancas[3][0], 230, 425, 13, font),
      centralizaTexto(page, dadosCriancas[3][1], 460, 425, 13, font))
    : (centralizaTexto(page, dadosIntermediarios[3][0], 230, 245, 13, font),
      centralizaTexto(page, dadosIntermediarios[3][1], 460, 245, 13, font));
  domingos[4] != ""
    ? isBebesOn
      ? (centralizaTexto(page, dadosCriancas[4][0], 230, 405, 13, font),
        centralizaTexto(page, dadosCriancas[4][1], 460, 405, 13, font))
      : (centralizaTexto(page, dadosIntermediarios[4][0], 230, 225, 13, font),
        centralizaTexto(page, dadosIntermediarios[4][1], 460, 225, 13, font))
    : null;

  //
  isBebesOn
    ? (centralizaTexto(page, dadosIntermediarios[0][0], 230, 305, 13, font),
      centralizaTexto(page, dadosIntermediarios[0][1], 460, 305, 13, font))
    : (centralizaTexto(page, dadosAdolescentes[0][0], 230, 125, 13, font),
      centralizaTexto(page, dadosAdolescentes[0][1], 460, 125, 13, font));
  isBebesOn
    ? (centralizaTexto(page, dadosIntermediarios[1][0], 230, 285, 13, font),
      centralizaTexto(page, dadosIntermediarios[1][1], 460, 285, 13, font))
    : (centralizaTexto(page, dadosAdolescentes[1][0], 230, 105, 13, font),
      centralizaTexto(page, dadosAdolescentes[1][1], 460, 105, 13, font));
  isBebesOn
    ? (centralizaTexto(page, dadosIntermediarios[2][0], 230, 265, 13, font),
      centralizaTexto(page, dadosIntermediarios[2][1], 460, 265, 13, font))
    : (centralizaTexto(page, dadosAdolescentes[2][0], 230, 85, 13, font),
      centralizaTexto(page, dadosAdolescentes[2][1], 460, 85, 13, font));
  isBebesOn
    ? (centralizaTexto(page, dadosIntermediarios[3][0], 230, 245, 13, font),
      centralizaTexto(page, dadosIntermediarios[3][1], 460, 245, 13, font))
    : (centralizaTexto(page, dadosAdolescentes[3][0], 230, 65, 13, font),
      centralizaTexto(page, dadosAdolescentes[3][1], 460, 65, 13, font));
  domingos[4] != ""
    ? isBebesOn
      ? (centralizaTexto(page, dadosIntermediarios[4][0], 230, 225, 13, font),
        centralizaTexto(page, dadosIntermediarios[4][1], 460, 225, 13, font))
      : (centralizaTexto(page, dadosAdolescentes[4][0], 230, 45, 13, font),
        centralizaTexto(page, dadosAdolescentes[4][1], 460, 45, 13, font))
    : null;

  //
  if (isBebesOn) {
    (centralizaTexto(page, dadosAdolescentes[0][0], 230, 125, 13, font),
    centralizaTexto(page, dadosAdolescentes[0][1], 460, 125, 13, font)),
      (centralizaTexto(page, dadosAdolescentes[1][0], 230, 105, 13, font),
      centralizaTexto(page, dadosAdolescentes[1][1], 460, 105, 13, font)),
      (centralizaTexto(page, dadosAdolescentes[2][0], 230, 85, 13, font),
      centralizaTexto(page, dadosAdolescentes[2][1], 460, 85, 13, font)),
      (centralizaTexto(page, dadosAdolescentes[3][0], 230, 65, 13, font),
      centralizaTexto(page, dadosAdolescentes[3][1], 460, 65, 13, font)),
      domingos[4] != ""
        ? (centralizaTexto(page, dadosAdolescentes[4][0], 230, 45, 13, font),
          centralizaTexto(page, dadosAdolescentes[4][1], 460, 45, 13, font))
        : null;
  }

  //Gera o PDF final
  const pdfBytes = await pdfDoc.save();

  // Faz o download no navegador
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "escala_cias_" + getYear(dataSelecionada) + "_" + getMonth(dataSelecionada) + ".pdf";
  a.click();

  /* // Abre o PDF em uma nova aba para pré-visualização
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank"); */
}
