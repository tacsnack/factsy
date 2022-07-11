import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


export interface GameOverDialogProps {
  name: string;
  open: boolean;
  onClose: (value: string) => void;
  points: number;
}

function GameOverDialog(props: GameOverDialogProps) {
  const { name, onClose, open, points} = props;

  const handleClose = (event: string, reason: string) => {
    if (reason && reason == "backdropClick") 
      return;
  };

  const handleReset = () => {
    onClose('reset');
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>"{name}" got {points} points</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem autoFocus button onClick={() => handleReset()}>
          <ListItemText primary="Leader Board" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default GameOverDialog;