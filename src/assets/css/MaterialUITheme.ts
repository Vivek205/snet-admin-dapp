import { createMuiTheme, Theme } from "@material-ui/core/styles";

let primaryMain = "#4f79f8";
let secondaryMain = "#c5c5c5";

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryMain
    },
    secondary: {
      main: secondaryMain
    }
  }
});
