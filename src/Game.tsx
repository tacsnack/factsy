import React from 'react'
import QuestionContainer from './questions/QuestionContainer';
import Timer from './timer/Timer';
import TimerState from './timer/TimerState';
import GameOverDialog from './GameDialog';
import Container from '@mui/material/Container';
import { Question } from './questions/Question';

interface GameProps {
    initialQuestions: Question[];
}

const Game = (props: GameProps) => {
    const {initialQuestions} = props;
    const maxSeconds = 10;
    const [time, setTime] = React.useState({seconds: maxSeconds});
    const [open, setOpen] = React.useState(false);
    const [gameState, setgameState] = React.useState('init');


    const onTick = () => {
        if (gameState != "init") {
            return
        }
        if (time.seconds === 0) {
            setgameState("lose")
            setOpen(true);
            return
        }
        setTime({seconds: time.seconds-1})
    }
    
    const onComplete = () => {
        setOpen(true);
        setgameState("win")
    }
    
    const handleClose = (s: string) => {
        if (s === "reset") {
            console.log("reset Game")
            for (var q in initialQuestions) {
                console.log(q)
                initialQuestions[q].isComplete = false
                initialQuestions[q].isFlipped = false
                setTime({seconds: maxSeconds})
                setgameState('init')
                setOpen(false);
            }
        }
    }

    return (
        <Container maxWidth="sm">
            <Timer onTick={onTick} timerState={time}></Timer>
            <QuestionContainer onComplete={onComplete} questions={initialQuestions}></QuestionContainer>
            <GameOverDialog
                gameState={gameState}
                open={open}
                onClose={handleClose}
            />
        </Container>
    );
}

export default Game;