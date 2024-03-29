import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
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
    value: 50,
    label: 'Medium',
  },
  {
    value: 100,
    label: 'Hard',
  },
];


function valuetext(value: number) {
  return "";
}

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export interface SliderProps {
  onChange: (value: number | number[]) => void;
  value: string;
}

function DiscreteSliderValues(props: SliderProps) {
  const { onChange, value } = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue)
  };

  return (
    <Box sx={{ width: 300, p: 1 }}>
      <Slider
        aria-label="Game Difficulty"
        defaultValue={0}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        onChange={handleChange}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}

export interface Props {
  open: boolean;
  onClose: (difficulty: string) => void;
}

function InitialGameDialog(props: Props) {
  const { onClose, open } = props;
  const [difficulty, setDifficulty] = React.useState("Easy");

  const handleChange = (newValue: number | number[]) => {
    let result = marks.at(marks.findIndex((mark) => mark.value === newValue as number)) ?? {label: 'Easy', value: 0}
    setDifficulty(result.label)
  };

  const handleClose = (event: string, reason: string) => {
    if (reason && reason == "backdropClick") 
      return;
  };

  const handleReset = () => {
      onClose(difficulty);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle><Typography variant="h4" align="center">Tapped</Typography></DialogTitle>
      <List>
        <ListItem>
          <DiscreteSliderValues value={difficulty} onChange={handleChange}></DiscreteSliderValues>
        </ListItem>
        <Box component="span" sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => handleReset()}>Start</Button>
        </Box>
      </List>
    </Dialog>
  );
}

export default InitialGameDialog;