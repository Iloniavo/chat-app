import { createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: "#121212",
    },
    error: {
      main: green[200],
    },
  },
});

export default theme;
