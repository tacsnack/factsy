import React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function LinearProgressWithLabel(props: LinearProgressProps & { value: number, seconds: number, level: number, points: number, name: string}) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 30 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(props.seconds)}s`}</Typography>
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


interface Props {
    timerState: TimerState;
    onTick: () => void;
    level: number;
    points: number;
    name: string;
    multiplier: number;
}


const HUD = (props: Props) => {
    const {timerState, onTick, level, points, name} = props;
    const tick = () => {
        onTick();
    };

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });
    
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="body2" color="text.secondary">Player: {props.name}</Typography>
                </Box>
                <Box sx={{ minWidth: 100 }}>
                    <Typography variant="body2" color="text.secondary">Streak: {props.multiplier}</Typography>
                </Box>
                <Box sx={{ minWidth: 100 }}>
                    <Typography variant="body2" color="text.secondary">Points: {props.points}</Typography>
                </Box>
                <Box sx={{ minWidth: 50 }}>
                    <Typography variant="body2" color="text.secondary">Level: {props.level}</Typography>
                </Box>
            </Box>
            <LinearProgressWithLabel 
                value={timerState.seconds/timerState.max*100}
                seconds={timerState.seconds}
                level={level}
                points={points}
                name={name}/>
        </Box>
    );
}

export default HUD;