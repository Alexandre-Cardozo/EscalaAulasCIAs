import { TextField, InputLabel, FormControl, NativeSelect, AppBar, Toolbar, Box, Typography } from "@mui/material";
import logo from "../assets/logo.jpeg";
import DaySelector from "../components/menu/DaySelector";
import DownloadButton from "../components/menu/DownloadButton";
import BabyToggleButton from "../components/menu/BabyToggleButton";
import LogoSection from "../components/menu/LogoSection";
import DateSelector from "../components/menu/DateSelector";

export default function PageHeader({
  isBebesOn,
  setIsBebesOn,
  onGerarPdf,
  dataSelecionada,
  setDataSelecionada,
  classDays,
  setClassDays,
}) {
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
          px: 1.25,
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
            flexWrap: "nowrap",
            width: { xs: "100%", sm: "auto", md: "auto" },
            justifyContent: "space-between",
          }}
        >
          <LogoSection logo={logo} />
          <DateSelector dataSelecionada={dataSelecionada} setDataSelecionada={setDataSelecionada} meses={meses} />
        </Box>

        {/* --- GRUPO 2: Toogle Bebês + Botão PDF --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            width: { xs: "100%", sm: "auto", md: "auto" },
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
            }}
          >
            <DaySelector isBebesOn={isBebesOn} classDays={classDays} setClassDays={setClassDays} />
            <BabyToggleButton isActive={isBebesOn} onChange={setIsBebesOn} label="Bebês" />
          </Box>
          <DownloadButton onClick={handleGerarPdf} label="Baixar PDF" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
