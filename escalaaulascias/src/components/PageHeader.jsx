import {
  styled,
  TextField,
  Switch,
  InputLabel,
  FormControl,
  NativeSelect,
  FormLabel,
  AppBar,
  Toolbar,
  Box,
  ButtonBase,
  FormControlLabel,
} from "@mui/material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { getMonth, getYear, set } from "date-fns";
import logo from "../assets/logo.jpeg";

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#000",
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: "#2ECA45",
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "#39393D",
      }),
    },
  })
);

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
          px: 3,
          minHeight: 64,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
          rowGap: 2,
        }}
      >
        {/* --- GRUPO 1: Logo + Data (ficam juntos em telas grandes) --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexWrap: { xs: "wrap", sm: "nowrap" },
            // Ocupa largura total apenas quando quebra para separar nos extremos
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-start" },
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "120px",
              height: "auto",
            }}
          />

          {/* Wrapper dos inputs */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Box sx={{ maxWidth: 125, minWidth: 100 }}>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#000", fontWeight: "bold" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#000", fontWeight: "bold" },
                  "& .MuiInputBase-input": { fontWeight: "bold", color: "#000" },
                  "& .MuiInputBase-input::placeholder": { fontWeight: "bold", color: "#000" },
                  "& .MuiInput-underline:before": { borderBottomColor: "#000", borderBottomWidth: 2 },
                  "&:hover .MuiInput-underline:before": { borderBottomColor: "#000", borderBottomWidth: 2 },
                  "& .MuiInput-underline:after": { borderBottomColor: "#000", borderBottomWidth: 2 },
                }}
              >
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Mês
                </InputLabel>
                <NativeSelect
                  value={getMonth(dataSelecionada)}
                  onChange={(e) => setDataSelecionada(set(dataSelecionada, { month: Number(e.target.value) }))}
                  sx={{ color: "#000" }}
                >
                  {meses.map((nome, index) => (
                    <option key={index} value={index}>
                      {nome}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>

            <Box sx={{ maxWidth: 60, minWidth: 50 }}>
              <TextField
                label="Ano"
                variant="standard"
                type="number"
                fullWidth
                value={getYear(dataSelecionada)}
                onChange={(e) => setDataSelecionada(set(dataSelecionada, { year: Number(e.target.value) }))}
                sx={{
                  "& .MuiInputLabel-root": { color: "#000", fontWeight: "bold" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#000", fontWeight: "bold" },
                  "& .MuiInputBase-input": { fontWeight: "bold", color: "#000" },
                  "& .MuiInputBase-input::placeholder": { fontWeight: "bold", color: "#000" },
                  "& .MuiInput-underline:before": { borderBottomColor: "#000", borderBottomWidth: 2 },
                  "&:hover .MuiInput-underline:before": { borderBottomColor: "#000", borderBottomWidth: 2 },
                  "& .MuiInput-underline:after": { borderBottomColor: "#000", borderBottomWidth: 2 },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* --- GRUPO 2: Switch + Botão PDF (ficam juntos, mas separam quando quebra) --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-start" },
          }}
        >
          <FormControlLabel
            labelPlacement="top"
            sx={{
              m: 0,
              alignItems: "center",
              ".MuiFormControlLabel-label": {
                fontSize: 14,
                fontWeight: "bold",
                color: "#000",
              },
            }}
            control={<IOSSwitch sx={{ m: 0.7 }} checked={isBebesOn} onChange={(e) => setIsBebesOn(e.target.checked)} />}
            label="Bebês"
          />
          <ButtonBase
            disableRipple
            disableTouchRipple
            focusRipple={false}
            aria-label="gerar-pdf"
            onClick={handleGerarPdf}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel sx={{ fontWeight: "bold", fontSize: 14, color: "#000", mb: 0.5 }}>PDF</FormLabel>
            <UploadFileRoundedIcon sx={{ transform: "rotate(180deg)", fontSize: 32, color: "#000" }} />
          </ButtonBase>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
