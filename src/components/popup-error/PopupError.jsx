import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class PopupError extends Component {
  state = {
    open: true,
  };

  constructor({ title, message, on_close } = {}) {
    super();

    this.title = title;
    this.message = message;
    this.on_close = on_close;
  }

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle>
          {this.title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {this.message}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.on_close} color="primary" autoFocus>
            Got it!
          </Button>
        </DialogActions>

      </Dialog>
    );
  }
}
