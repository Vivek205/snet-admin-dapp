import React from 'react';


import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { Theme, createStyles, withStyles } from '@material-ui/core';

interface IProps {
    classes: any;
    showAlert: boolean;
    handleAlertClose(): void;
    alertVariant?: string;
    alertText: string;
}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonStop: {
        fontSize: '1.4rem',
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    buttonStart: {
        fontSize: '1.4rem',
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700]
        }
    },
    fabProgress: {
        fontSize: '1.4rem',
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        fontSize: '1.4rem',
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    snackbar_success: {
        fontSize: '1.8rem',
        backgroundColor: green[600]
    },
    snackbar_error: {
        fontSize: '1.8rem',
        backgroundColor: theme.palette.error.dark
    }
});

const CommonAlert: React.FC<IProps> = (props) => {
    const { classes, showAlert, handleAlertClose, alertVariant, alertText } = props;
    return (
        <Snackbar
            className={classes.snackbar}
            classes={{
                root: classes.snackbar
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={showAlert}
            onClose={handleAlertClose}
            ContentProps={{
                "aria-describedby": "message-id"
            }}


        >
            <SnackbarContent
                className={classes[`snackbar_${alertVariant}`]}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleAlertClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                message={<span id="message-id">{alertText}</span>}
            />
        </Snackbar>
    );
};

CommonAlert.defaultProps = {
    alertVariant: 'success'
}

export default withStyles(styles)(CommonAlert);