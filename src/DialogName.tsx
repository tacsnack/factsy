import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const marks = [
  {
    value: 0,
    label: 'Easy',
  },
  {
    value: 20,
    label: 'Medium',
  },
  {
    value: 40,
    label: 'Hard',
  },
  {
    value: 100,
    label: 'Lol',
  },
];


function valuetext(value: number) {
  return `${value}°C`;
}

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export function DiscreteSliderValues() {
  return (
    <Box sx={{ width: 300, p: 1 }}>
      <Slider
        aria-label="Game Difficulty"
        defaultValue={20}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}

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
      <DialogTitle><Typography variant="h4" align="center">Game Options</Typography></DialogTitle>
      <List>
        <ListItem>
          <TextField fullWidth id="outlined-required" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        </ListItem>
        <ListItem>
          <DiscreteSliderValues></DiscreteSliderValues>
        </ListItem>
        <Box component="span" sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => handleReset()}>Start</Button>
        </Box>
      </List>
    </Dialog>
  );
}

export default NameDialog;