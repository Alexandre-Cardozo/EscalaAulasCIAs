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
          <LogoSection logo={logo} />
          <DateSelector dataSelecionada={dataSelecionada} setDataSelecionada={setDataSelecionada} meses={meses} />
        </Box>

        {/* --- GRUPO 2: Toogle Bebês + Botão PDF --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-start" },
          }}
        >
          <DaySelector isBebesOn={isBebesOn} classDays={classDays} setClassDays={setClassDays} />
          <BabyToggleButton isActive={isBebesOn} onChange={setIsBebesOn} label="Bebês" />
          <DownloadButton onClick={handleGerarPdf} label="Baixar PDF" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
