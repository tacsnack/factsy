import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Score} from './Score';


export interface Props {
  open: boolean;
  onClose: () => void;
  scores: Score[];
  scoresToday: Score[];
  difficulty: string;
}

function LeaderBoardDialog(props: Props) {
  const { onClose, open, scores, scoresToday, difficulty} = props;

  const handleClose = (event: string, reason: string) => {
    if (reason && reason == "backdropClick") 
      return;
  };

  const handleReset = () => {
    onClose();
  };

  const today_scores = scoresToday.map(q => (
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

  const alltime_scores = scores.map(q => (
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
      {/* <DialogTitle>Top Scores</DialogTitle> */}
      <List sx={{ pt: 0 }}>
        <ListItem>
          <Box component="span" sx={{ p: 2 }}>
            <Button variant="outlined" onClick={() => handleReset()}>New Game</Button>
          </Box>
        </ListItem>
        <ListItem>
          <Typography variant="h6" component="div" gutterBottom>{difficulty}: Today's Top 5</Typography>
        </ListItem>
        {today_scores}
        <ListItem>
          <Typography variant="h6" component="div" gutterBottom>{difficulty}: All Time</Typography>
        </ListItem>
        {alltime_scores}
      </List>
    </Dialog>
  );
}

export default LeaderBoardDialog;