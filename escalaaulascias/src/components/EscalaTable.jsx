import {
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import "jspdf-autotable"; // Uma extensão útil para criar tabelas

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 20,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    fontWeight: "bold",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#E8E8E8",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function EscalaTable({
  domingos,
  cor,
  titulo,
  variant = "padrao",
  nomesTabela = [],
  onChangeNome,
}) {
  return (
    <Paper
      elevation={10}
      sx={{
        paddingTop: 2,
        paddingBottom: 4,
        margin: 3,
        backgroundColor: cor,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ marginBottom: 2, fontWeight: "bold" }}
      >
        {titulo}
      </Typography>
      <TableContainer>
        <Table
          sx={{ minWidth: 500, tableLayout: "fixed" }}
          aria-label="customized table"
        >
          <TableHead
            sx={{
              "& .MuiTableCell-head": {
                backgroundColor: cor,
                borderTop: "5px solid #FFF",
              },
            }}
          >
            <TableRow>
              <StyledTableCell
                align="center"
                sx={{ width: 150, maxWidth: 150 }}
              >
                Data
              </StyledTableCell>
              {variant === "bebes" ? (
                <StyledTableCell align="center">Período</StyledTableCell>
              ) : (
                <>
                  <StyledTableCell align="center">Louvor</StyledTableCell>
                  <StyledTableCell align="center">Palavra</StyledTableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {domingos.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{
                    width: 150,
                    maxWidth: 150,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data ?? ""}
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    required
                    fullWidth
                    placeholder="Nome..."
                    variant="standard"
                    color={cor}
                    focused
                    value={nomesTabela[index]?.[0] ?? ""}
                    onChange={(e) => onChangeNome?.(index, 0, e.target.value)}
                  />
                </StyledTableCell>
                {variant === "padrao" ? (
                  <StyledTableCell>
                    <TextField
                      required
                      fullWidth
                      placeholder="Nome..."
                      variant="standard"
                      color={cor}
                      focused
                      value={nomesTabela[index]?.[1] ?? ""}
                      onChange={(e) => onChangeNome?.(index, 1, e.target.value)}
                    />
                  </StyledTableCell>
                ) : null}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
