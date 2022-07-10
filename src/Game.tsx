import React from 'react'
import GameCardContainer from './cards/GameCardContainer';
import { GameCardContent } from './cards/GameCardContent';
import { CARDS } from './cards/MockCards';
import Timer from './Timer';
import GameOverDialog from './GameDialog';
import GameStates from './GameDialog';
import Container from '@mui/material/Container';

function shuffle(array: GameCardContent[] ) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

const Game = () => {
    const maxSeconds = 20;
    const [time, setTime] = React.useState({seconds: maxSeconds, max: maxSeconds});
    const [cards, setCards] = React.useState<GameCardContent[]>([]);
    const [open, setOpen] = React.useState(true);
    const [level, setLevel] = React.useState(0);
    const [points, setPoints] = React.useState(0);
    const [currentGameState, setcurrentGameState] = React.useState('init');

    const shuffleCards = () => {
        var shuffledCards : GameCardContent[] = [];
        for (var q in CARDS) {
            // console.log(q);
            shuffledCards.push(CARDS[q]);
            shuffledCards.push({...CARDS[q]});
            shuffledCards[shuffledCards.length-1].id += 10;
        }
        if (level > 0) { shuffledCards = shuffledCards.sort( () => .5 - Math.random() ); } // not good rando... 
        if (level > 2) { shuffledCards = shuffle(shuffledCards) }
        setCards(shuffledCards)
    }

    const onTick = () => {
        if (currentGameState != 'play') {
            return
        }
        if (time.seconds === 0) {
            setcurrentGameState('lose')
            setOpen(true);
            return
        }
        setTime({seconds: time.seconds-1, max: maxSeconds})
    }
    
    const onComplete = () => {
        setOpen(true);
        // setgameState("win")
        setLevel(level+1)
        setPoints(points + time.seconds)
        handleClose('next')
    }
    
    const handleClose = (s: string) => {
        var currentLevel = level
        if (s === "reset") {
            console.log("reset")
            setLevel(0)
            currentLevel = 0
            setPoints(0)
        }
        for (var q in cards) {
            cards[q].isComplete = false
            cards[q].isFlipped = false
        }
        if (currentLevel > 0 && currentLevel <= 5) { setTime({seconds: time.seconds+5, max: maxSeconds}) }
        else if (currentLevel > 5) { setTime({seconds: time.seconds+2, max: maxSeconds}) }
        else { setTime({seconds: maxSeconds, max: maxSeconds}) }
        setcurrentGameState('play')
        setOpen(false);
        shuffleCards();
    }

    return (
        <Container maxWidth="sm">
            <Timer onTick={onTick} timerState={time} level={level} points={points}></Timer>
            <GameCardContainer onComplete={onComplete} cards={cards}></GameCardContainer>
            <GameOverDialog
                gameState={currentGameState}
                open={open}
                onClose={handleClose}
                points={points}
            />
        </Container>
    );
}

export default Game;