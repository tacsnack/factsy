import React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number, seconds: number}) {
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
    isSignedIn: boolean;
    onScoresClick: () => void;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    username: string;
}


const GameTopBar = (props: Props) => {
    const {timerState, isSignedIn, onScoresClick, onLoginClick, onLogoutClick, username} = props;
    
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" style={{justifyContent: "flex-start"}} sx={{ flexGrow: 1 }} onClick={() => onScoresClick()}>
                            <Typography variant="h6" component="div" >
                                Tapped
                            </Typography>
                        </Button>
                    { isSignedIn ? (
                        <Button color="inherit" onClick={() => onLogoutClick()}>{username}</Button>
                    ) : (
                        <Button color="inherit" onClick={() => onLoginClick()}>Sign-in</Button>
                    )
                    }
                    </Toolbar>
                </AppBar>
            </Box>
            <LinearProgressWithLabel 
                value={timerState.seconds/timerState.max*100}
                seconds={timerState.seconds}/>
        </Box>
    );
}

export default GameTopBar;