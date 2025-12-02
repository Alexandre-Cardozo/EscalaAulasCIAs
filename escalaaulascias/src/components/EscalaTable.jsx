import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  InputBase,
  Typography,
} from "@mui/material";

// Função auxiliar para mapear o nome da cor (ex: "verde") para as variáveis CSS do seu index.css
const getThemeColors = (colorProp) => {
  const normalizedColor = colorProp?.toLowerCase() || "blue";

  const map = {
    green: { main: "var(--section-green)", light: "var(--section-green-light)" },
    verde: { main: "var(--section-green)", light: "var(--section-green-light)" },

    red: { main: "var(--section-red)", light: "var(--section-red-light)" },
    vermelho: { main: "var(--section-red)", light: "var(--section-red-light)" },

    blue: { main: "var(--section-blue)", light: "var(--section-blue-light)" },
    azul: { main: "var(--section-blue)", light: "var(--section-blue-light)" },
    padrao: { main: "var(--section-blue)", light: "var(--section-blue-light)" },

    purple: { main: "var(--section-purple)", light: "var(--section-purple-light)" },
    roxo: { main: "var(--section-purple)", light: "var(--section-purple-light)" },

    yellow: { main: "var(--section-yellow)", light: "var(--section-yellow-light)" },
    amarelo: { main: "var(--section-yellow)", light: "var(--section-yellow-light)" },
  };

  return map[normalizedColor] || map.blue;
};

export default function EscalaTable({
  diasAulas,
  cor = "blue",
  titulo,
  variant = "padrao",
  nomesTabela = [],
  onChangeNome,
}) {
  const { main, light } = getThemeColors(cor);
  const isBebes = variant === "bebes";

  // Estilos reutilizáveis
  const headerCellStyle = {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.875rem",
    borderBottom: "none",
    padding: "12px 16px",
    textAlign: "center", // Adicionado para centralizar o texto
  };

  const inputStyle = {
    "& .MuiInputBase-input": {
      textAlign: "center",
      padding: "8px",
      fontSize: "0.95rem",
      borderRadius: "6px",
      transition: "background-color 0.2s",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      },
      "&:focus": {
        backgroundColor: "#fff",
      },
    },
  };

  return (
    <Box sx={{ margin: 4 }}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          marginBottom: 4,
          overflow: "hidden",
          borderRadius: 3, // Arredondamento estilo card moderno
          border: "1px solid rgba(0,0,0,0.08)",
          backgroundColor: "background.paper",
        }}
      >
        {/* Cabeçalho da Seção (A faixa colorida) */}
        <Box
          sx={{
            backgroundColor: `hsl(${main})`, // Consome a variável CSS
            padding: 2,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Efeito sutil de brilho/textura */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: "bold",
              position: "relative",
              letterSpacing: "0.5px",
              textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {titulo}
          </Typography>
        </Box>

        <TableContainer>
          <Table sx={{ width: "100%", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: 140 }} />
              <col style={{ width: "auto" }} />
              {!isBebes && <col style={{ width: "auto" }} />}
            </colgroup>
            <TableHead>
              <TableRow sx={{ backgroundColor: `hsl(${main})`, opacity: 0.95 }}>
                <TableCell sx={{ ...headerCellStyle, paddingLeft: 3 }}>DATA</TableCell>
                {isBebes ? (
                  <TableCell sx={headerCellStyle}>PERÍODO</TableCell>
                ) : (
                  <>
                    <TableCell sx={headerCellStyle}>LOUVOR</TableCell>
                    <TableCell sx={headerCellStyle}>PALAVRA</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {diasAulas.map((data, index) => {
                // Alternância de cores baseada nas variáveis light
                const isEven = index % 2 === 0;
                const rowBg = isEven ? `hsl(${light})` : "transparent";

                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: rowBg,
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.02)" }, // Hover sutil
                      "& td": { borderBottom: "1px solid rgba(0,0,0,0.05)" },
                    }}
                  >
                    {/* Célula Data */}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        paddingLeft: 3,
                        fontWeight: 600,
                        color: "text.secondary",
                        whiteSpace: "nowrap",
                        textAlign: "center", // Adicionado para centralizar o texto da célula de dados
                      }}
                    >
                      {data ?? ""}
                    </TableCell>

                    {/* Célula Input 1 */}
                    <TableCell sx={{ p: 1 }}>
                      <InputBase
                        fullWidth
                        placeholder="Nome"
                        value={nomesTabela[index]?.[0] ?? ""}
                        onChange={(e) => onChangeNome?.(index, 0, e.target.value.slice(0, 20))}
                        sx={inputStyle}
                      />
                    </TableCell>

                    {/* Célula Input 2 (Se não for bebês) */}
                    {!isBebes && (
                      <TableCell sx={{ p: 1 }}>
                        <InputBase
                          fullWidth
                          placeholder="Nome"
                          value={nomesTabela[index]?.[1] ?? ""}
                          onChange={(e) => onChangeNome?.(index, 1, e.target.value.slice(0, 20))}
                          sx={inputStyle}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer da Seção (A faixa colorida) */}
        <Box
          sx={{
            backgroundColor: `hsl(${main})`, // Consome a variável CSS
            padding: 2,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Efeito sutil de brilho/textura */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
