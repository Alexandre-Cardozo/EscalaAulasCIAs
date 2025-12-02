import { Box, FormControl, NativeSelect, InputLabel, TextField } from "@mui/material";
import { getMonth, getYear } from "date-fns";

export default function DateSelectors({ dataSelecionada, setDataSelecionada, meses }) {
  const handleMonthChange = (e) => {
    const newDate = new Date(dataSelecionada);
    newDate.setMonth(Number(e.target.value));
    setDataSelecionada(newDate);
  };

  const handleYearChange = (e) => {
    const newDate = new Date(dataSelecionada);
    newDate.setFullYear(Number(e.target.value));
    setDataSelecionada(newDate);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, md: 2 },
        backgroundColor: "rgba(241, 245, 249, 0.5)", // slate-100/50
        padding: "6px",
        borderRadius: "9999px",
        border: "1px solid rgba(180, 180, 180, 0.7)", // slate-200/60
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Month Select */}
        <FormControl
          sx={{
            minWidth: "130px",
            height: "36px",
            "& .MuiInputLabel-root": { display: "none" },
            "& .MuiInputBase-root": {
              height: "36px !important",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              borderRadius: "9999px",
              backgroundColor: "white",
              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              border: "none",
              paddingLeft: "12px",
              paddingRight: "12px",
              "&:focus-within": {
                boxShadow: "0 0 0 1px rgba(33, 150, 243, 0.2)",
                outline: "none",
              },
            },
            "& .MuiInput-root": { marginTop: "0 !important" },
            "& .MuiInput-underline:before": { borderBottom: "none !important" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "none !important",
            },
            "& .MuiInput-underline:after": { borderBottom: "none !important" },
            "& .MuiInputBase-input": {
              color: "hsl(var(--foreground))",
              fontWeight: "500",
              padding: "0 !important",
              textAlign: "left",
              height: "36px",
              lineHeight: "36px",
              fontSize: "1rem",
            },
            "& .MuiNativeSelect-icon": {
              color: "hsl(var(--foreground))",
              right: "8px",
            },
          }}
        >
          <InputLabel variant="standard" htmlFor="month-select" sx={{ display: "none" }}>
            Mês
          </InputLabel>
          <NativeSelect id="month-select" value={getMonth(dataSelecionada)} onChange={handleMonthChange}>
            {meses.map((nome, index) => (
              <option key={index} value={index}>
                {nome}
              </option>
            ))}
          </NativeSelect>
        </FormControl>

        {/* Year Input */}
        <TextField
          id="year-input"
          type="number"
          value={getYear(dataSelecionada)}
          onChange={handleYearChange}
          inputProps={{
            min: 1900, // Define um valor mínimo razoável para o ano
            max: 2100, // Define um valor máximo razoável para o ano
            style: {
              textAlign: "center",
              padding: "0 9px",
              height: "36px",
              lineHeight: "36px",
              fontSize: "1rem",
              fontWeight: "500",
              color: "hsl(var(--foreground))",
            },
          }}
          sx={{
            minWidth: "90px",
            height: "36px",
            "& .MuiInputBase-root": {
              height: "36px !important",
              minHeight: "36px",
              borderRadius: "9999px",
              backgroundColor: "white",
              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              border: "none",
              "&:focus-within": {
                boxShadow: "0 0 0 1px rgba(33, 150, 243, 0.2)",
                outline: "none",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
}
