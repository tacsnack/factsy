import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

interface Props {
    level: number;
    points: number;
    multiplier: number;
    difficulty: string;
    onDifficultyClick: () => void;
}

const GameStats = (props: Props) => {
    const {level, points, multiplier, difficulty, onDifficultyClick} = props;
    
    return (
        <Box sx={{ flexGrow: 1, my: 2}}>
            <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                        Strk: {multiplier}
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                        Pnts: {points}
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                        Lvl: {level}
                    </Typography>
                    
                    <Button color="inherit" onClick={() => onDifficultyClick()}>{difficulty}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default GameStats;