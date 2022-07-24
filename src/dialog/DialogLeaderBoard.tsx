import React from 'react'
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Score} from './Score';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export interface Props {
  open: boolean;
  onClose: () => void;
  scores: Score[];
  scoresToday: Score[];
  difficulty: string;
  points: number;
}

function LeaderBoardDialog(props: Props) {
  const { onClose, open, scores, scoresToday, difficulty, points} = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = (event: string, reason: string) => {
    onClose();
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
      <Box>
        <Alert icon={<CelebrationIcon fontSize="inherit" />} severity="success">
          You got {points} points on {difficulty}! <br></br> Highscores below...
        </Alert>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Today" {...a11yProps(0)} />
            <Tab label="All-Time" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {today_scores}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {alltime_scores}
        </TabPanel>
      </Box>
    </Dialog>
  );
}

export default LeaderBoardDialog;