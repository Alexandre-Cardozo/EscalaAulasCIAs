import { PDFDocument, StandardFonts } from "pdf-lib";
import { getMonth, getYear, getDaysInMonth, format } from "date-fns";

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
    ? page.drawText(dadosBebes[0][0], { x: 125, y: 665, size: 13, font })
    : (page.drawText(dadosCriancas[0][0], { x: 125, y: 485, size: 13, font }),
      page.drawText(dadosCriancas[0][1], { x: 355, y: 485, size: 13, font }));
  isBebesOn
    ? page.drawText(dadosBebes[1][0], { x: 125, y: 645, size: 13, font })
    : (page.drawText(dadosCriancas[1][0], { x: 125, y: 465, size: 13, font }),
      page.drawText(dadosCriancas[1][1], { x: 355, y: 465, size: 13, font }));
  isBebesOn
    ? page.drawText(dadosBebes[2][0], { x: 125, y: 625, size: 13, font })
    : (page.drawText(dadosCriancas[2][0], { x: 125, y: 445, size: 13, font }),
      page.drawText(dadosCriancas[2][1], { x: 355, y: 445, size: 13, font }));
  isBebesOn
    ? page.drawText(dadosBebes[3][0], { x: 125, y: 605, size: 13, font })
    : (page.drawText(dadosCriancas[3][0], { x: 125, y: 425, size: 13, font }),
      page.drawText(dadosCriancas[3][1], { x: 355, y: 425, size: 13, font }));
  domingos[4] != ""
    ? isBebesOn
      ? page.drawText(dadosBebes[4][0], { x: 125, y: 585, size: 13, font })
      : (page.drawText(dadosCriancas[4][0], { x: 125, y: 405, size: 13, font }),
        page.drawText(dadosCriancas[4][1], { x: 355, y: 405, size: 13, font }))
    : null;

  //
  isBebesOn
    ? (page.drawText(dadosCriancas[0][0], { x: 125, y: 485, size: 13, font }),
      page.drawText(dadosCriancas[0][1], { x: 355, y: 485, size: 13, font }))
    : (page.drawText(dadosIntermediarios[0][0], { x: 125, y: 305, size: 13, font }),
      page.drawText(dadosIntermediarios[0][1], { x: 355, y: 305, size: 13, font }));
  isBebesOn
    ? (page.drawText(dadosCriancas[1][0], { x: 125, y: 465, size: 13, font }),
      page.drawText(dadosCriancas[1][1], { x: 355, y: 465, size: 13, font }))
    : (page.drawText(dadosIntermediarios[1][0], { x: 125, y: 285, size: 13, font }),
      page.drawText(dadosIntermediarios[1][1], { x: 355, y: 285, size: 13, font }));
  isBebesOn
    ? (page.drawText(dadosCriancas[2][0], { x: 125, y: 445, size: 13, font }),
      page.drawText(dadosCriancas[2][1], { x: 355, y: 445, size: 13, font }))
    : (page.drawText(dadosIntermediarios[2][0], { x: 125, y: 265, size: 13, font }),
      page.drawText(dadosIntermediarios[2][1], { x: 355, y: 265, size: 13, font }));
  isBebesOn
    ? (page.drawText(dadosCriancas[3][0], { x: 125, y: 425, size: 13, font }),
      page.drawText(dadosCriancas[3][1], { x: 355, y: 425, size: 13, font }))
    : (page.drawText(dadosIntermediarios[3][0], { x: 125, y: 245, size: 13, font }),
      page.drawText(dadosIntermediarios[3][1], { x: 355, y: 245, size: 13, font }));
  domingos[4] != ""
    ? isBebesOn
      ? (page.drawText(dadosCriancas[4][0], { x: 125, y: 405, size: 13, font }),
        page.drawText(dadosCriancas[4][1], { x: 355, y: 405, size: 13, font }))
      : (page.drawText(dadosIntermediarios[4][0], { x: 125, y: 225, size: 13, font }),
        page.drawText(dadosIntermediarios[4][1], { x: 355, y: 225, size: 13, font }))
    : null;

  //
  isBebesOn
    ? (page.drawText(dadosIntermediarios[0][0], { x: 125, y: 305, size: 13, font }),
      page.drawText(dadosIntermediarios[0][1], { x: 355, y: 305, size: 13, font }))
    : (page.drawText(dadosAdolescentes[0][0], { x: 125, y: 125, size: 13, font }),
      page.drawText(dadosAdolescentes[0][1], { x: 355, y: 125, size: 13, font }));
  isBebesOn
    ? (page.drawText(dadosIntermediarios[1][0], { x: 125, y: 285, size: 13, font }),
      page.drawText(dadosIntermediarios[1][1], { x: 355, y: 285, size: 13, font }))
    : (page.drawText(dadosAdolescentes[1][0], { x: 125, y: 105, size: 13, font }),
      page.drawText(dadosAdolescentes[1][1], { x: 355, y: 105, size: 13, font }));
  isBebesOn
    ? (page.drawText(dadosIntermediarios[2][0], { x: 125, y: 265, size: 13, font }),
      page.drawText(dadosIntermediarios[2][1], { x: 355, y: 265, size: 13, font }))
    : (page.drawText(dadosAdolescentes[2][0], { x: 125, y: 85, size: 13, font }),
      page.drawText(dadosAdolescentes[2][1], { x: 355, y: 85, size: 13, font }));
  isBebesOn
    ? (page.drawText(dadosIntermediarios[3][0], { x: 125, y: 245, size: 13, font }),
      page.drawText(dadosIntermediarios[3][1], { x: 355, y: 245, size: 13, font }))
    : (page.drawText(dadosAdolescentes[3][0], { x: 125, y: 65, size: 13, font }),
      page.drawText(dadosAdolescentes[3][1], { x: 355, y: 65, size: 13, font }));
  domingos[4] != ""
    ? isBebesOn
      ? (page.drawText(dadosIntermediarios[4][0], { x: 125, y: 225, size: 13, font }),
        page.drawText(dadosIntermediarios[4][1], { x: 355, y: 225, size: 13, font }))
      : (page.drawText(dadosAdolescentes[4][0], { x: 125, y: 45, size: 13, font }),
        page.drawText(dadosAdolescentes[4][1], { x: 355, y: 45, size: 13, font }))
    : null;

  //
  if (isBebesOn) {
    (page.drawText(dadosAdolescentes[0][0], { x: 125, y: 125, size: 13, font }),
    page.drawText(dadosAdolescentes[0][1], { x: 355, y: 125, size: 13, font })),
      (page.drawText(dadosAdolescentes[1][0], { x: 125, y: 105, size: 13, font }),
      page.drawText(dadosAdolescentes[1][1], { x: 355, y: 105, size: 13, font })),
      (page.drawText(dadosAdolescentes[2][0], { x: 125, y: 85, size: 13, font }),
      page.drawText(dadosAdolescentes[2][1], { x: 355, y: 85, size: 13, font })),
      (page.drawText(dadosAdolescentes[3][0], { x: 125, y: 65, size: 13, font }),
      page.drawText(dadosAdolescentes[3][1], { x: 355, y: 65, size: 13, font })),
      domingos[4] != ""
        ? (page.drawText(dadosAdolescentes[4][0], { x: 125, y: 45, size: 13, font }),
          page.drawText(dadosAdolescentes[4][1], { x: 355, y: 45, size: 13, font }))
        : null;
  }

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
