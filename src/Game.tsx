import React from 'react'
import GameCardContainer from './cards/GameCardContainer';
import { GameCardContent } from './cards/GameCardContent';
import { CARDS } from './cards/MockCards';
import HUD from './HUD';
import GameOverDialog from './DialogGameOver';
import LeaderBoardDialog from './DialogLeaderBoard';
import {Score} from './Score';
import NameDialog from './DialogName';
import Container from '@mui/material/Container';
import { database } from "./Firebase"; 

function writeUserData(name: string, score: number) {
    database.collection("scores").add({
        name: name,
        score: score,
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

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
    const [scores, setScores] = React.useState<Score[]>([]);
    const [open, setOpen] = React.useState(false);
    const [level, setLevel] = React.useState(0);
    const [points, setPoints] = React.useState(0);
    const [initialOpen, setInitialOpen] = React.useState(true);
    const [leaderBoardOpen, setLeaderBoardOpen] = React.useState(false);
    const [user, setUser] = React.useState("");
    const [currentGameState, setcurrentGameState] = React.useState('init');

    const fetchData = ()=>{
        database.collection("scores").orderBy("score", "desc").limit(10).get().then((querySnapshot) => {
            // Loop through the data and store
            // it in array to display
            var new_scores: Score[] = []
            querySnapshot.forEach(item => {
                var new_score = new Score({name:  item.data().name, score: item.data().score, id: item.id})
                new_scores.push(new_score)
            });
            setScores(new_scores)
        })
    }

    const shuffleCards = (lev: number) => {
        var shuffledCards : GameCardContent[] = [];
        for (var q in CARDS) {
            // console.log(q);
            shuffledCards.push(CARDS[q]);
            shuffledCards.push({...CARDS[q]});
            shuffledCards[shuffledCards.length-1].id += 10;
        }
        if (lev > 0) { shuffledCards = shuffledCards.sort( () => .5 - Math.random() ); } // not good rando... 
        if (lev > 5) { shuffledCards = shuffle(shuffledCards) } // better...
        setCards(shuffledCards)
    }

    const onTick = () => {
        if (currentGameState != 'play') {
            return
        }
        if (time.seconds === 0) {
            setcurrentGameState('lose')
            setOpen(true);
            writeUserData(user, points)
            return
        }
        setTime({seconds: time.seconds-1, max: maxSeconds})
    }

    const onCardComplete = () => {
        setPoints(points + 1)
        Math.min(time.seconds+1, maxSeconds)
    }
    
    const onComplete = () => {
        setLevel(level+1)
        setPoints(points + time.seconds)
        setTime({seconds: Math.min(time.seconds+Math.max(5-level, 1), maxSeconds), max: maxSeconds})
        for (var q in cards) {
            cards[q].isComplete = false
            cards[q].isFlipped = false
        }
        shuffleCards(level+1);
    }

    const handleInitialClose = (s: string) => {
        var substring = s.length > 6 ? 
            s.substring(0, 6) : 
            s;
        setInitialOpen(false)
        setUser(substring)
        shuffleCards(0);
        setcurrentGameState('play')
    }

    const handleLeaderBoardClose = () => {
        setLeaderBoardOpen(false)
        setcurrentGameState('play')
        setScores([])
    }
    
    const handleGameOverClose = (s: string) => {
        for (var q in cards) {
            cards[q].isComplete = false
            cards[q].isFlipped = false
        }
        for (var q in scores) {
            console.log(scores[q])
        }
        shuffleCards(0);
        setLevel(0)
        setPoints(0)
        fetchData()
        setTime({seconds: maxSeconds, max: maxSeconds})
        setcurrentGameState('leaderboard')
        setLeaderBoardOpen(true)
        setOpen(false);
    }

    return (
        <Container maxWidth="sm">
            <HUD onTick={onTick} timerState={time} level={level} points={points} name={user}></HUD>
            <GameCardContainer onComplete={onComplete} onCardComplete={onCardComplete} cards={cards}></GameCardContainer>
            <NameDialog
                open={initialOpen}
                onClose={handleInitialClose}
            />
            { leaderBoardOpen && <LeaderBoardDialog
                scores={scores}
                open={leaderBoardOpen}
                onClose={handleLeaderBoardClose}
            /> }
            <GameOverDialog
                name={user}
                open={open}
                onClose={handleGameOverClose}
                points={points}
            />
        </Container>
    );
}

export default Game;