import React, { Component, ReactNode, ReactElement } from "react";
import StringInput from "./StringInput";
import BooleanInput from "./BooleanInput";
import {
  anyObject,
  configs,
  boolObject,
  stringObject
} from "../../typeScript/interfaces";
import { isEmptyObject } from "../../utilities/util";
import { isValidNumber } from "../../utilities/validation";

// MaterialUI Imports
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { withStyles, createStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

interface IProps {
  classes: any;
  activeSection: string;
  configs: configs;
  handleSubmit(editedConfigs: stringObject): void;
}

interface IState {
  booleans: boolObject;
  strings: stringObject;
}

const styles = (): any =>
  createStyles({
    card: {
      minWidth: 275
      // width: '40%'
    },
    cardHeader: {
      textAlign: "left"
    },
    cardActions: {
      float: "right",
      paddingRight: 32,
      paddingBottom: 10
    },
    cardHeaderTitle: {
      fontSize: "2.5rem"
    },
    cardContentRoot: {
      paddingTop: 0
    },
    footer: {
      top: "auto",
      bottom: 0
    },
    toolbar: {
      alignItems: "center",
      justifyContent: "space-between"
    },
    actionButtons: {
      margin: "0 auto"
    },
    button: {
      fontSize: "1.4rem",
      margin: "auto 15px"
    }
  });

class InputsContainer extends Component<IProps, IState> {
  public state = {
    booleans: {},
    strings: {}
  };

  private handleBoolanChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ): void => {
    let booleans: boolObject = { ...this.state.booleans };
    booleans[name] = event.currentTarget.checked;
    this.setState({ booleans });
  };

  private handleStringChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
    type: string | number
  ): void => {
    let value: string | boolean | number = event.currentTarget.value;
    if (type === "number") {
      value = isValidNumber(value);
    } // validate number
    if (!value) {
      return;
    } // return if the value validated is false
    let strings: stringObject = { ...this.state.strings };
    strings[name] = value.toString();
    this.setState({ strings });
  };

  private handleCancel = (): void => {
    let booleans: boolObject = {};
    let strings: stringObject = {};
    this.setState({ booleans, strings });
  };

  private handleSubmit = (): void => {
    let submitObj: stringObject = {
      ...this.state.booleans,
      ...this.state.strings
    };
    this.props.handleSubmit(submitObj);
  };

  private shouldActionsBeDisabled = (): boolean => {
    if (
      isEmptyObject(this.state.booleans) &&
      isEmptyObject(this.state.strings)
    ) {
      return true;
    }
    return false;
  };

  public render(): ReactNode {
    const { classes, activeSection, configs } = this.props;
    const booleans: boolObject = { ...this.state.booleans };
    const strings: stringObject = { ...this.state.strings };
    return (
      <>
        <Card className={classes.card}>
          <CardHeader
            title={<span>{activeSection} settings</span>}
            className={classes.cardHeader}
            classes={{ title: classes.cardHeaderTitle }}
          ></CardHeader>

          <CardContent classes={{ root: classes.cardContentRoot }}>
            <List>
              {configs[activeSection] &&
                configs[activeSection].map(
                  (config: anyObject, index: number): ReactElement | void => {
                    // ConfigType - Boolean
                    if (config.type === 4) {
                      return (
                        <ListItem>
                          <BooleanInput
                            checked={
                              typeof booleans[config.name] === "undefined"
                                ? config.value
                                : booleans[config.name]
                            }
                            label={config.name}
                            description={config.description}
                            handleChange={this.handleBoolanChange}
                            restart={config.restartDaemon === 1}
                            disabled={!config.editable}
                            mandatory={config.mandatory}
                          />
                        </ListItem>
                      );
                    }
                    // ConfigType - String or URL or Number
                    return (
                      <ListItem>
                        <StringInput
                          type={config.type === 1 ? "number" : "string"}
                          key={config.name}
                          value={
                            typeof strings[config.name] === "undefined"
                              ? config.value
                              : strings[config.name]
                          }
                          description={config.description}
                          label={config.name}
                          handleChange={this.handleStringChange}
                          restart={config.restartDaemon === 1}
                          disabled={!config.editable}
                          mandatory={config.mandatory}
                        />
                      </ListItem>
                    );
                  }
                )}
            </List>
          </CardContent>
        </Card>
        <CssBaseline />
        <AppBar position="fixed" className={classes.footer} color="secondary">
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h4"
              color="inherit"
              className={classes.actionButtons}
            >
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.handleCancel}
                disabled={this.shouldActionsBeDisabled()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleSubmit}
                disabled={this.shouldActionsBeDisabled()}
              >
                Submit
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default withStyles(styles)(InputsContainer);
