import { TextField, InputLabel, FormControl, NativeSelect, AppBar, Toolbar, Box, Typography } from "@mui/material";
import { getMonth, getYear, set } from "date-fns";
import logo from "../assets/logo.jpeg";
import DaySelector from "../components/menu/DaySelector";
import DownloadButton from "../components/menu/DownloadButton";
import BabyToggleButton from "../components/menu/BabyToggleButton";

export default function PageHeader({ isBebesOn, setIsBebesOn, onGerarPdf, dataSelecionada, setDataSelecionada }) {
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

  const handleGerarPdf = () => {
    onGerarPdf?.(isBebesOn);
  };

  return (
    <AppBar position="sticky" elevation={3} color="default" sx={{ bgcolor: "background.paper", borderRadius: 0, m: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 1.5, sm: 3 },
          minHeight: 64,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
          rowGap: 1.5,
        }}
      >
        {/* --- GRUPO 1: Logo + Data --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 3 },
            flexWrap: "nowrap",
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-start" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: { xs: "100px", sm: "120px" },
                height: "auto",
                display: "block",
              }}
            />

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                paddingTop: 1.25,
              }}
            >
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontFamily: "Fredoka, sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "primary.main",
                  lineHeight: 1,
                }}
              >
                Escala
              </Typography>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  fontSize: "0.6rem",
                  color: "text.secondary",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                }}
              >
                AULAS CIAS
              </Typography>
            </Box>
          </Box>

          {/* Wrapper dos inputs */}
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              borderRadius: "9999px",
              backgroundColor: theme.palette.grey[50],
              border: `1px solid ${theme.palette.grey[300]}`,
              padding: "4px",
              height: "36px",
              maxWidth: { xs: "220px", sm: "none" },
            })}
          >
            {/* Seletor de Mês */}
            <FormControl
              sx={{
                minWidth: { xs: "120px", sm: "140px" },
                maxWidth: "190px",
                flex: 1,
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
                  border: "1px solid transparent",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  "&:focus-within": {
                    boxShadow: "0 0 0 1px hsl(var(--ring)), 0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    borderColor: "hsl(var(--ring))",
                  },
                },
                "& .MuiInput-root": { marginTop: "0 !important" },
                "& .MuiInput-underline:before": { borderBottom: "none !important" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none !important" },
                "& .MuiInput-underline:after": { borderBottom: "none !important" },
                "& .MuiInputBase-input": {
                  color: "hsl(var(--foreground))",
                  fontWeight: "500",
                  padding: "0 !important",
                  textAlign: "left",
                  height: "36px",
                  lineHeight: "36px",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
                "& .MuiNativeSelect-icon": {
                  color: "hsl(var(--foreground))",
                  right: "8px",
                },
              }}
            >
              <InputLabel variant="standard" htmlFor="native-month-select" shrink={false}>
                Mês
              </InputLabel>
              <NativeSelect
                id="native-month-select"
                value={getMonth(dataSelecionada)}
                onChange={(e) => setDataSelecionada(set(dataSelecionada, { month: Number(e.target.value) }))}
              >
                {meses.map((nome, index) => (
                  <option key={index} value={index}>
                    {nome}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>

            {/* Input de Ano */}
            <TextField
              label="Ano"
              variant="standard"
              type="number"
              value={getYear(dataSelecionada)}
              onChange={(e) => setDataSelecionada(set(dataSelecionada, { year: Number(e.target.value) }))}
              sx={{
                minWidth: { xs: "60px", sm: "80px" },
                maxWidth: { xs: "60px", sm: "85px" },
                height: "36px",
                margin: 0,
                "& .MuiInputLabel-root": { display: "none" },
                "& .MuiInputBase-root": {
                  height: "36px !important",
                  minHeight: "36px",
                  borderRadius: "9999px",
                  backgroundColor: "white",
                  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                  border: "1px solid transparent",
                  "&:focus-within": {
                    boxShadow: "0 0 0 1px hsl(var(--ring)), 0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    borderColor: "hsl(var(--ring))",
                  },
                },
                "& .MuiInput-root": { marginTop: "0 !important" },
                "& .MuiInput-underline:before": { borderBottom: "none !important" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none !important" },
                "& .MuiInput-underline:after": { borderBottom: "none !important" },
                "& .MuiInputBase-input": {
                  color: "hsl(var(--foreground))",
                  fontWeight: "500",
                  padding: "0 8px !important", // Padding interno menor
                  textAlign: "center",
                  height: "36px",
                  lineHeight: "36px",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
              }}
            />
          </Box>
        </Box>

        {/* --- GRUPO 2: Switch + Botão PDF --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-start" },
          }}
        >
          <DaySelector isBebesOn={isBebesOn} />
          <BabyToggleButton isActive={isBebesOn} onChange={setIsBebesOn} label="Bebês" />
          <DownloadButton onClick={handleGerarPdf} label="Baixar PDF" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
