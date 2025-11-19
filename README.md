# Escala Aulas CIAS

SPA desenvolvida para auxiliar os responsáveis pelas CIAs na criação da escala de atuação das professoras da EBD.

A principal função da aplicação é gerar um PDF com todas as informações preenchidas em tela, considerando o período selecionado. Esse documento pode então ser compartilhado para a divulgação da escala.

## Funcionamento

A aplicação calcula automaticamente os domingos existentes no mês/ano selecionado e disponibiliza campos de formulário para o preenchimento dos nomes das professoras que atuarão em cada data, bem como a definição das funções específicas conforme a tabela correspondente.

Ao abrir a página, o mês e o ano atual são pré-selecionados, mas o usuário pode modificar esses valores no cabeçalho conforme necessário.
Também é possível escolher se a geração do PDF incluirá ou não a classe de Bebês. Por padrão, essa opção vem ativada, podendo ser habilitada ou desabilitada através do switch no cabeçalho.

## Tecnologias Utilizadas

Este projeto é uma aplicação web desenvolvida com React e Vite, utilizando a biblioteca Material-UI para a construção da interface do usuário. A aplicação também incorpora funcionalidades para manipulação e geração de documentos PDF, conforme indicado pelas dependências `jspdf` e `pdf-lib`.

*   **React**: Biblioteca JavaScript para construção de interfaces de usuário.
*   **Vite**: Ferramenta de build rápida para projetos web modernos.
*   **Material-UI (MUI)**: Biblioteca de componentes React que implementa o Material Design do Google.
*   **date-fns**: Biblioteca para manipulação de datas.
*   **jspdf**: Biblioteca para geração de PDFs no lado do cliente.
*   **pdf-lib**: Biblioteca para criação e modificação de documentos PDF.
