import React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function LinearProgressWithLabel(props: LinearProgressProps & { value: number, seconds: number, level: number, points: number}) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 50 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(props.seconds)}s`}</Typography>
            </Box>
            <Box sx={{ minWidth: 100 }}>
                <Typography variant="body2" color="text.secondary">Points: {props.points}</Typography>
            </Box>
            <Box sx={{ minWidth: 50 }}>
                <Typography variant="body2" color="text.secondary">Level: {props.level}</Typography>
            </Box>
        </Box>
    );
}


class TimerState {
    seconds: number;
    max: number;

    constructor(initializer?: any) {
        this.seconds = initializer.seconds;
        this.max = initializer.max;
    }
}


interface TimerProps {
    timerState: TimerState;
    onTick: () => void;
    level: number;
    points: number;
}


const Timer = (props: TimerProps) => {
    const {timerState, onTick, level, points} = props;
    const tick = () => {
        onTick();
    };

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });
    
    return (
        <LinearProgressWithLabel 
            value={timerState.seconds/timerState.max*100}
            seconds={timerState.seconds}
            level={level}
            points={points}/>
    );
}

export default Timer;