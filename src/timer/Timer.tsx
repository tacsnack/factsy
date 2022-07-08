import React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TimerState from './TimerState';


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
            )}s`}</Typography>
        </Box>
        </Box>
    );
}


interface TimerProps {
    timerState: TimerState;
    onTick: () => void;
}


const Timer = (props: TimerProps) => {
    const {timerState, onTick} = props;
    const tick = () => {
        onTick();
    };

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });
    
    return (
        <LinearProgressWithLabel value={timerState.seconds} />
    );
}

export default Timer;