import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { auth } from "./Firebase"; 

export interface GameOverDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  points: number;
}

function GameOverDialog(props: GameOverDialogProps) {
  const { onClose, open, points} = props;

  const handleClose = (event: string, reason: string) => {
    if (reason && reason == "backdropClick") 
      return;
  };

  const handleReset = () => {
    onClose('reset');
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>"{auth.currentUser?.displayName}" got {points} points</DialogTitle>
      <Box component="span" sx={{ p: 2 }}>
        <Button variant="outlined" onClick={() => handleReset()}>Leader Board</Button>
      </Box>
    </Dialog>
  );
}

export default GameOverDialog;