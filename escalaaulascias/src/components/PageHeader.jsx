import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getMonth, getYear, set } from "date-fns";
import logo from "../assets/logo.jpeg";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
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
        backgroundColor: "#65C466",
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
}));

export default function PageHeader({
  meses,
  dataSelecionada,
  setDataSelecionada,
  isBebesOn,
  setIsBebesOn,
}) {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ paddingLeft: 3, paddingRight: 3 }}
    >
      <Typography variant="h5">Escala CIAs</Typography>
      <img src={logo} alt="Logo" width={50} height={50} />
      <Select
        value={getMonth(dataSelecionada)}
        onChange={(e) =>
          setDataSelecionada(
            set(dataSelecionada, { month: Number(e.target.value) })
          )
        }
      >
        {meses.map((nome, index) => (
          <MenuItem key={index} value={index}>
            {nome}
          </MenuItem>
        ))}
      </Select>
      <TextField
        type="number"
        fullWidth
        value={getYear(dataSelecionada)}
        onChange={(e) =>
          setDataSelecionada(
            set(dataSelecionada, { year: Number(e.target.value) })
          )
        }
      />
      <FormControlLabel
        control={
          <IOSSwitch
            sx={{ m: 1 }}
            checked={isBebesOn}
            onChange={(e) => setIsBebesOn(e.target.checked)}
          />
        }
        label="Bebês"
      />
      <Button
        variant="contained"
        size="large"
        color="primary"
        endIcon={<UploadFileRoundedIcon sx={{ transform: "rotate(180deg)" }} />}
      >
        PDF
      </Button>
    </Grid>
  );
}
