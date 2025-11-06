// src/App.jsx
import React, { useState, useEffect } from 'react';

// Importe os componentes do Material-UI
import { Box, Button, Typography, Grid, Paper, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

// Importe a biblioteca de datas
import { getMonth, getYear, set, getDaysInMonth, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Para nomes em português

// Importe o jsPDF
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Uma extensão útil para criar tabelas

// --- O Componente Principal da sua Página ---
function App() {
  
  // --- O "Estado" (memória) do React ---
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [domingos, setDomingos] = useState([]);
  
  // Nomes dos meses para o seletor
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
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
      if (dataAtual.getDay() === 0) { // 0 = Domingo
        novosDomingos.push(format(dataAtual, 'dd/MM/yyyy'));
      }
    }
    setDomingos(novosDomingos);
    
    // NOTA: Aqui você também precisará de estados para guardar 
    // os nomes das professoras. Ex:
    // const [nomes03, setNomes03] = useState({});
    
  }, [dataSelecionada]); // "Dependência": rode quando isso mudar

  // --- Função do Botão de Gerar PDF ---
  const handleGerarPDF = () => {
    alert("Iniciando a geração do PDF!");
    
    // A LÓGICA DO JSpdf viria aqui
    // Ela leria os dados do 'estado' do React, não do HTML
    const doc = new jsPDF();
    doc.text(`Escala de ${meses[getMonth(dataSelecionada)]} / ${getYear(dataSelecionada)}`, 20, 20);
    
    // Exemplo de como usar o 'autotable' para ser mais fácil
    doc.autoTable({
      startY: 30,
      head: [['Dias', 'Período (0-3)']],
      body: domingos.map(data => [
          data, 
          "Nome da Professora aqui" // Ex: nomes03[data]
        ]),
      theme: 'grid'
    });
    
    // ... repetir para as outras tabelas ...

    doc.save("escala.pdf");
  };

  // --- O que será desenhado na tela (JSX) ---
  return (
    <Box sx={{ padding: 3 }}>
      
      {/* Bloco 1: Informações e Ações */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Gerador de Escala GIA</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            {/* Seletor de Mês */}
            <FormControl fullWidth>
              <InputLabel>Mês</InputLabel>
              <Select
                value={getMonth(dataSelecionada)}
                onChange={(e) => setDataSelecionada(set(dataSelecionada, { month: e.target.value }))}
              >
                {meses.map((nome, index) => (
                  <MenuItem key={index} value={index}>{nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            {/* Seletor de Ano */}
            <TextField
              label="Ano"
              type="number"
              fullWidth
              value={getYear(dataSelecionada)}
              onChange={(e) => setDataSelecionada(set(dataSelecionada, { year: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleGerarPDF}>
              Gerar PDF
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Blocos das Classes */}
      {/* Aqui você criaria os componentes para as tabelas. 
          Exemplo simples de como as linhas seriam geradas: */}
          
      <Typography variant="h6">Tabela de Exemplo (Crianças)</Typography>
      <Paper>
        <Grid container>
          {/* Cabeçalho */}
          <Grid item xs={4}><Typography p={1} fontWeight="bold">Data</Typography></Grid>
          <Grid item xs={4}><Typography p={1} fontWeight="bold">Louvor</Typography></Grid>
          <Grid item xs={4}><Typography p={1} fontWeight="bold">Palavra</Typography></Grid>

          {/* Linhas (geradas dinamicamente) */}
          {domingos.map((data, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}><Typography p={1}>{data}</Typography></Grid>
              <Grid item xs={4}>
                <TextField 
                  variant="standard" 
                  fullWidth
                  placeholder="Nome..."
                  // onChange={(e) => ...aqui atualizaria o estado...}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField 
                  variant="standard" 
                  fullWidth
                  placeholder="Nome..."
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Paper>

    </Box>
  );
}

export default App;