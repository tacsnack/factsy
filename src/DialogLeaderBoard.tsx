import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { database } from './Firebase';



export interface Props {
  open: boolean;
  onClose: () => void;
}

function LeaderBoardDialog(props: Props) {
  const { onClose, open } = props;

  const handleClose = (event: string, reason: string) => {
    if (reason && reason == "backdropClick") 
      return;
  };

  const handleReset = () => {
    onClose();
  };
  var itemvalues: any[] = [];
  
  database.collection("scores").orderBy("score", "desc").limit(5).get().then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
          console.log(`${doc.id} => ${doc.data()}`);
          itemvalues.push(doc.data())
      });
  });

  const listitems = itemvalues.map(q => (
    <ListItem>
      <ListItemText primary={q.name} secondary={q.score} />
    </ListItem>
  ));

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Top Scores</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem autoFocus button onClick={() => handleReset()}>
          <ListItemText primary="Start New Game" />
        </ListItem>
        {listitems}
      </List>
    </Dialog>
  );
}

export default LeaderBoardDialog;