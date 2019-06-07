import React, { Component, ReactNode } from "react";
import SectionMenu from "./SectionMenu";

import InputsContainer from "./InputsContainer";
import { grpc } from "@improbable-eng/grpc-web";
import { Code } from "../../typeScript/grpc";
import { anyObject, configs, stringObject } from "../../typeScript/interfaces";
import Loader from "../../reusableComponents/Loader";
import GetDaemonEndpoint from "../daemonEndpoint/GetDaemonEndpoint";
import StartStopDaemon from "./StartStopDaemon";

// Generated STUB Imports
import { ConfigurationService } from "../../protos/config/config_pb_service";
import {
  ConfigurationResponse,
  ReadRequest,
  UpdateRequest,
  ConfigurationParameter
} from "../../protos/config/config_pb";
import { NameValue } from "../../protos/config/config_pb";

// MaterialUI Imports
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

interface IProps {
  classes: anyObject;
  network: any;
}

interface IState {
  configs: configs;
  sections: string[];
  activeSection: string;
  showLoader: boolean;
  daemonEndpoint: string;
  showError: boolean;
}

export interface Menu {
  name: string;
  icon: string;
}

const drawerWidth = 240;

const styles = (theme: Theme): any =>
  createStyles({
    root: {
      display: "flex",
      position: "relative"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3
    },
    toolbar: theme.mixins.toolbar,
    header: {
      margin: "0 auto"
    }
  });

class Operator extends Component<IProps, IState> {
  private userAddress: string = "";
  private currentBlockNumber: number = 0;

  public state = {
    activeSection: "general",
    configs: {},
    sections: [],
    showLoader: true,
    daemonEndpoint: "",
    showError: false
  };

  private handleSectionChange = (activeSection: string): void => {
    this.setState({ activeSection });
  };

  private handleDaemonEndpoint = (daemonEndpoint: string): void => {
    this.setState({ daemonEndpoint });
    this.fetchConfigDetails();
  };

  private fetchConfigDetails = async (): Promise<any> => {
    const { network } = this.props;
    let sections: string[] = [];
    let configs: any = {};
    const readRequest: ReadRequest = new ReadRequest();
    // let userAddress: string = '';
    // let currentBlockNumber: number = 0;

    this.userAddress = await network.getAccount();
    this.currentBlockNumber = await network.getCurrentBlockNumber();
    readRequest.setCurrentBlock(this.currentBlockNumber);
    readRequest.setUserAddress(this.userAddress);

    let msg = network.composeSHA3Message(
      ["string", "uint256", "address"],
      ["_Request_Read", this.currentBlockNumber, this.userAddress]
    );

    network.eth
      .personal_sign(msg, this.userAddress)
      .then((signed: string): void => {
        let signature = network.buffSignature(signed);
        readRequest.setSignature(signature);
        try {
          grpc.invoke(ConfigurationService.GetConfiguration, {
            request: readRequest,
            host: this.state.daemonEndpoint,
            onMessage: (message: ConfigurationResponse): void => {
              message
                .getConfigurationList()
                .map((value: ConfigurationParameter, index: number): void => {
                  let config: any = {
                    name: value.getName(),
                    value: value.getValue(),
                    type: value.getType(),
                    editable: value.getEditable(),
                    description: value.getDescription(),
                    restartDaemon: value.getRestartDaemon(),
                    section: value.getSection()
                  };
                  if (!sections.includes(value.getSection())) {
                    // If new section comes in the loop
                    sections.push(value.getSection());
                    configs[config.section] = [];
                  }
                  configs[config.section].push(config);
                });
              this.setState({ configs, sections, activeSection: sections[0] });
            },
            onEnd: (
              code: Code,
              msg: string | undefined,
              trailers: grpc.Metadata
            ): void => {
              if (code === 2) {
                this.setState({ showError: true });
              }
              this.setState({ showLoader: false });
            }
          });
        } catch (err) {
          this.setState({ showLoader: false });
        }
      })
      .catch((err: string): void => {
        this.setState({ showLoader: false, showError: true });
      });
  };

  //Have to be typed properly
  private updateConfigDetails = async (
    submitArr: NameValue[]
  ): Promise<any> => {
    const { network } = this.props;
    const updateRequest: UpdateRequest = new UpdateRequest();
    this.currentBlockNumber = await network.getCurrentBlockNumber();

    updateRequest.setUpdatedConfigurationList(submitArr);
    updateRequest.setUserAddress(this.userAddress);
    updateRequest.setCurrentBlock(this.currentBlockNumber);

    let msg = network.composeSHA3Message(
      ["string", "uint256", "address"],
      ["_Request_Update", this.currentBlockNumber, this.userAddress]
    );

    network.eth
      .personal_sign(msg, this.userAddress)
      .then((signed: string): void => {
        let signature = network.buffSignature(signed);
        updateRequest.setSignature(signature);
        try {
          grpc.invoke(ConfigurationService.UpdateConfiguration, {
            request: updateRequest,
            host: this.state.daemonEndpoint,
            onMessage: (message: ConfigurationResponse): void => {},
            onEnd: (
              code: Code,
              msg: string | undefined,
              trailers: grpc.Metadata
            ): void => {}
          });
        } catch (err) {
          this.setState({ showError: true });
        }
      })
      .catch((error: string): void => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  private handleSubmit = (editedConfigs: stringObject): void => {
    let submitArr: NameValue[] = [];
    Object.entries(editedConfigs).forEach(([key, value]): void => {
      let nameValue: NameValue = new NameValue();
      nameValue.setName(key);
      nameValue.setValue(value);
      submitArr.push(nameValue);
    });
    this.updateConfigDetails(submitArr);
  };

  private toggleError = (): void => {
    if (this.state.daemonEndpoint !== "") {
      this.setState({ showLoader: true, showError: false });
      this.fetchConfigDetails();
    }
  };

  public render(): ReactNode {
    const { classes, network } = this.props;
    const { activeSection, configs, showLoader, daemonEndpoint } = this.state;
    if (daemonEndpoint === "") {
      return (
        <GetDaemonEndpoint handleDaemonEndpoint={this.handleDaemonEndpoint} />
      );
    }
    if (showLoader) {
      return <Loader show={showLoader} label="Waiting for metamask sign in" />;
    }
    return (
      <div>
        {/* <ErrorComponent show={this.state.showError} handleClose={this.toggleError} /> */}
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography
                variant="h4"
                color="inherit"
                className={classes.header}
              >
                SingularityNet Operator UI
              </Typography>
              <StartStopDaemon
                network={network}
                daemonEndpoint={daemonEndpoint}
              />
            </Toolbar>
          </AppBar>
          <SectionMenu
            classes={classes}
            sections={this.state.sections}
            handleSectionChange={this.handleSectionChange}
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph variant="display1">
              <InputsContainer
                classes={classes}
                activeSection={activeSection}
                configs={configs}
                handleSubmit={this.handleSubmit}
              />
            </Typography>
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Operator);
