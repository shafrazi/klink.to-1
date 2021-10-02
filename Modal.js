import React from 'react';
import { useContext, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

import { AppContext } from 'src/context';

function Modal(props) {
  const { openModal, handleCloseModal } = useContext(AppContext);

  const { childComponent, modalTitle } = props;

  return (
    <Dialog
      open={openModal}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleCloseModal();
        }
      }}
      aria-labelledby="form-dialog-title"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent>{childComponent}</DialogContent>
    </Dialog>
  );
}

export default Modal;
