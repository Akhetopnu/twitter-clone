import './PopupError.scss'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class PopupError extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    on_click: PropTypes.func,
  }
  static defaultProps = {
    is_open: true,
  }

  state = {
    is_open: true,
  }

  constructor({ title, message, on_click, is_open } = {}) {
    super();

    this.title = title;
    this.message = message;
    this.close = this.close.bind(this);
    this.on_click = on_click;
    this.is_open = is_open;
  }

  close() {
    this.on_click && this.on_click();
    this.setState({
      is_open: false,
    });
  }

  render() {
    return (
      <Dialog
        open={this.state.is_open}
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
          <Button color="primary" autoFocus onClick={this.close}>
            Got it!
          </Button>
        </DialogActions>

      </Dialog>
    );
  }
}
