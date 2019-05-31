import React, { Fragment, ReactElement } from "react";
import { ICONS } from "./icons";

// MaterialUI Imports
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import Zoom from "@material-ui/core/Zoom";

const styles = {
  label: {
    fontSize: "1.5rem",
    marginRight: 20
  },
  input: {
    fontSize: "2rem"
  },
  icon: {
    verticalAlign: "middle",
    marginLeft: 5
  },
  tooltip: {
    fontSize: "1.5rem"
  }
};

interface IProps {
  classes: any;
  type?: string | number;
  value: string;
  label: string;
  description: string;
  handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    label: string,
    type?: string | number
  ): void;
  disabled?: boolean;
  restart?: boolean;
  mandatory?: boolean;
}

const StringInput: React.FC<IProps> = (props): ReactElement => {
  const {
    classes,
    label: displayLabel,
    handleChange,
    value,
    description,
    disabled,
    type,
    restart,
    mandatory
  } = props;
  return (
    <div>
      <FormControlLabel
        labelPlacement="start"
        control={
          <Fragment>
            {restart ? (
              <Tooltip
                title="changing this value will cause the daemon to restart"
                interactive
                TransitionComponent={Zoom}
                classes={{ tooltip: classes.tooltip }}
              >
                <Icon
                  className={ICONS.warning}
                  classes={{ root: classes.icon }}
                  fontSize="small"
                  color="error"
                />
              </Tooltip>
            ) : (
              ""
            )}

            <Input
              className={classes.input}
              // defaultValue={value}
              value={value}
              disabled={disabled}
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                handleChange(event, displayLabel, type)
              }
            />
          </Fragment>
        }
        label={
          <Fragment>
            {displayLabel}
            <Tooltip
              title={description}
              interactive
              TransitionComponent={Zoom}
              classes={{ tooltip: classes.tooltip }}
            >
              <Icon
                className={ICONS.tooltipInfo}
                classes={{ root: classes.icon }}
                fontSize="small"
              />
            </Tooltip>
            {mandatory ? (
              <Tooltip
                title="This is a required field and cannot be left empty"
                interactive
                TransitionComponent={Zoom}
                classes={{ tooltip: classes.tooltip }}
              >
                <Icon
                  className={ICONS.mandatory}
                  classes={{ root: classes.mandatoryIcon }}
                  fontSize="small"
                  color="error"
                />
              </Tooltip>
            ) : (
              ""
            )}
            &nbsp;:
          </Fragment>
        }
        classes={{
          label: classes.label
        }}
      />
    </div>
  );
};

StringInput.defaultProps = {
  type: "string",
  disabled: false,
  restart: false,
  mandatory: false
};

export default withStyles(styles)(StringInput);
