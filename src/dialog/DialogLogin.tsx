import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import { auth, uiConfigAuth } from "./Firebase"; 


export interface Props {
  open: boolean;
}

function LoginDialog(props: Props) {
  const { open } = props;

  const handleClose = (event: string, reason: string) => {
    console.log('closed')
    if (reason && reason == "backdropClick") 
      return;
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <StyledFirebaseAuth uiConfig={uiConfigAuth} firebaseAuth={auth} />
    </Dialog>
  );
}

export default LoginDialog;