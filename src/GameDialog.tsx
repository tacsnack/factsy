import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';


export interface GameOverDialogProps {
  gameState: string;
  open: boolean;
  onClose: (value: string) => void;
  points: number;
}

function GameOverDialog(props: GameOverDialogProps) {
  const { gameState, onClose, open, points} = props;

  const handleClose = () => {
    onClose('closed');
  };

  const handleReset = () => {
    onClose('reset');
  };

  var dialog = "Wanna Play?";
  if (gameState === "init") {
    dialog = "Click Stuff"
  }
  if (gameState === "lose") {
    dialog = `You got ${points} points`
  }

  var dialogStart = "Start";
  if (gameState === "init") {
    dialogStart = "Start"
  }
  if (gameState === "lose") {
    dialogStart = "Start Over"
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{dialog}</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem autoFocus button onClick={() => handleReset()}>
          <ListItemText primary={dialogStart} />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default GameOverDialog;