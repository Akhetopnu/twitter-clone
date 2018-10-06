import './PopupError.scss'
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Link } from 'react-router-dom';

export class PopupError extends Component {
  constructor({ title, message, is_open, on_click } = {}) {
    super();

    this.title = title;
    this.message = message;
    this.on_click = on_click || (() => {
      this.setState({
        is_open: false,
      });
    });
    this.is_open = !on_click;
  }

  render() {
    return (
      <Dialog
        open={this.is_open}
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
          <Button color="primary" autoFocus onClick={this.on_click}>
            <Link className='popup-error-link' to='..'>
              Got it!
            </Link>
          </Button>
        </DialogActions>

      </Dialog>
    );
  }
}
