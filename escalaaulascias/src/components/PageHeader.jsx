import {
  styled,
  TextField,
  Switch,
  InputLabel,
  FormControl,
  NativeSelect,
  Select,
  AppBar,
  Toolbar,
  Box,
  FormControlLabel,
  Typography,
  IconButton,
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
          backgroundColor: "#23A349",
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
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-start" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
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
              padding: "6px",
              height: "36px", // Altura fixa para o container
            })}
          >
            {/* Seletor de Mês (NativeSelect) */}
            <FormControl
              sx={{
                minWidth: "140px",
                maxWidth: "190px",
                flex: 1,
                height: "36px", // Altura fixa
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
                "& .MuiInput-root": {
                  marginTop: "0 !important",
                },
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
                },
                "& .MuiNativeSelect-icon": {
                  color: "hsl(var(--foreground))",
                  right: "12px",
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

            {/* Input de Ano (TextField) */}
            <TextField
              label="Ano"
              variant="standard"
              type="number"
              value={getYear(dataSelecionada)}
              onChange={(e) => setDataSelecionada(set(dataSelecionada, { year: Number(e.target.value) }))}
              sx={{
                minWidth: "80px",
                maxWidth: "100px",
                height: "36px", // Altura fixa
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
                "& .MuiInput-root": {
                  marginTop: "0 !important",
                },
                "& .MuiInput-underline:before": { borderBottom: "none !important" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none !important",
                },
                "& .MuiInput-underline:after": { borderBottom: "none !important" },
                "& .MuiInputBase-input": {
                  color: "hsl(var(--foreground))",
                  fontWeight: "500",
                  padding: "0 12px !important",
                  textAlign: "center",
                  height: "36px",
                  lineHeight: "36px",
                },
              }}
            />
          </Box>
        </Box>

        {/* --- GRUPO 2: Switch + Botão PDF (ficam juntos, mas separam quando quebra) --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-start" },
          }}
        >
          <FormControlLabel
            labelPlacement="top"
            sx={{
              m: 1,
              alignItems: "center",
              ".MuiFormControlLabel-label": {
                fontSize: 14,
                fontWeight: "bold",
                color: "#23A349",
              },
            }}
            control={
              <IOSSwitch sx={{ m: 0.25 }} checked={isBebesOn} onChange={(e) => setIsBebesOn(e.target.checked)} />
            }
            label="Bebês"
          />
          <IconButton
            aria-label="gerar-pdf"
            title="Baixar PDF"
            onClick={handleGerarPdf}
            sx={(theme) => ({
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: theme.palette.grey[50],
              border: `1px solid ${theme.palette.grey[300]}`,
              boxShadow: "none",
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.grey[100],
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
              },
            })}
          >
            <UploadFileRoundedIcon
              sx={{
                fontSize: 30,
                color: "primary.main",
                transform: "rotate(180deg)",
              }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
