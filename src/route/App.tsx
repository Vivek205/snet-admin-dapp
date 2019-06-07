import React, { Component, ReactNode } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import asyncComponent from "../utilities/AsyncComponent";
import BlockchainHelper from "../utilities/BlockChainHelper";

// MaterialUI Imports
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../assets/css/MaterialUITheme";

//Code Splitting
const AsyncHome = asyncComponent(
  (): Promise<any> => import("../pages/home/Home")
);
const AsyncPageNotFound = asyncComponent(
  (): Promise<any> => import("../pages/PageNotFound")
);

interface IState {
  web3Initialized: boolean;
}

class App extends Component<{}, IState> {
  private network: any = undefined;

  public state: IState = {
    web3Initialized: false
  };

  public componentDidMount = (): void => {
    window.addEventListener("load", (): void => this.handleWindowLoad());
  };

  private handleWindowLoad = (): void => {
    if (typeof window.web3 !== "undefined") {
      this.network = new BlockchainHelper(window.web3);
      this.network
        .initialize()
        .then((value: boolean): void => {
          this.setState({ web3Initialized: value });
        })
        .catch((): void => {
          // eslint-disable-next-line no-console
          console.log("web3 not loaded. try reloading the page");
        });
    }
  };

  public render(): ReactNode {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={(props: any): ReactNode => (
                  <AsyncHome
                    {...props}
                    web3Initialized={this.state.web3Initialized}
                    network={this.network}
                  />
                )}
              />
              <Route component={AsyncPageNotFound} />
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
