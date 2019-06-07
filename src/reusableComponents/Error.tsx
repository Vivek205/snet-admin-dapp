import React, { Component, ReactNode } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IProps {
  show: boolean;
  handleClose(): void;
}

class ErrorComponent extends Component<IProps> {
  // handleClose = () => {
  //     this.props.handleClose();
  // };

  public render(): ReactNode {
    const { show } = this.props;
    return (
      <div>
        <Dialog
          open={show}
          // onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Invalid Access
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button 
                        onClick={this.handleClose} 
                        color="primary" autoFocus>
                            OK
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ErrorComponent;
