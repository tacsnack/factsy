import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export interface Props {
  open: boolean;
  onClose: (value: string) => void;
}

function NameDialog(props: Props) {
  const { onClose, open } = props;
  const [name, setName] = React.useState("");

  const handleClose = (event: string, reason: string) => {
    if (reason && reason == "backdropClick") 
      return;
  };

  const handleReset = () => {
      if (name.length==0) {
        return;
      }
      onClose(name);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Enter Username</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        </ListItem>
        <ListItem autoFocus button onClick={() => handleReset()}>
          <ListItemText primary="Start" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default NameDialog;