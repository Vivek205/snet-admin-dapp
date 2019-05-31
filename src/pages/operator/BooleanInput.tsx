import React, { Fragment, ReactElement } from "react";
import { anyObject } from "../../typeScript/interfaces";
import { ICONS } from "./icons";

// MaterialUI Imports
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import Zoom from "@material-ui/core/Zoom";

const styles = {
  label: {
    fontSize: "1.5rem",
    marginRight: 15
  },
  tooltip: {
    fontSize: "1.5rem"
  },
  icon: {
    verticalAlign: "middle",
    marginLeft: 5
  }
};

interface IProps {
  classes: anyObject;
  checked: boolean;
  label: string;
  description: string;
  handleChange(e: React.ChangeEvent<HTMLInputElement>, label: string): void;
  disabled?: boolean;
  restart?: boolean;
  mandatory?: boolean;
}

const BooleanInput: React.FC<IProps> = (props): ReactElement => {
  const {
    checked,
    label,
    handleChange,
    classes,
    description,
    disabled,
    restart,
    mandatory
  } = props;
  return (
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

          <Switch
            checked={checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange(e, label)
            }
            value="checkedA"
            disabled={disabled}
          />
        </Fragment>
      }
      label={
        <Fragment>
          {label}
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
  );
};

BooleanInput.defaultProps = {
  disabled: false,
  restart: false,
  mandatory: false
};

export default withStyles(styles)(BooleanInput);
