import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {Score} from './Score';


export interface Props {
  open: boolean;
  onClose: () => void;
  scores: Score[];
}

function LeaderBoardDialog(props: Props) {
  const { onClose, open, scores } = props;

  const handleClose = (event: string, reason: string) => {
    if (reason && reason == "backdropClick") 
      return;
  };

  const handleReset = () => {
    onClose();
  };

  for (var q in scores) {
    console.log(scores[q].id)
  }

  const listitems = scores.map(q => (
    <ListItem key={q.id}>
      <Grid container>
        <Grid item xs>
          {q.name}
        </Grid>
        <Grid item xs spacing={3}>
          {q.score}
        </Grid>
      </Grid>
    </ListItem>
  ));

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Top Scores</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <Box component="span" sx={{ p: 2 }}>
            <Button variant="outlined" onClick={() => handleReset()}>New Game</Button>
          </Box>
        </ListItem>
        {listitems}
      </List>
    </Dialog>
  );
}

export default LeaderBoardDialog;