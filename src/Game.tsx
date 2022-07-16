import React from 'react'
import GameCardContainer from './cards/GameCardContainer';
import { GameCardContent } from './cards/GameCardContent';
import { CARDS } from './cards/MockCards';
import HUD from './HUD';
import GameOverDialog from './DialogGameOver';
import LeaderBoardDialog from './DialogLeaderBoard';
import {Score} from './Score';
import InitialGameDialog from './DialogInitialGame';
import Container from '@mui/material/Container';
import { database } from "./Firebase"; 

function writeUserData(name: string, score: number, difficulty: string, level: number, duration: number) {
    var isoDateTime = new Date().toISOString()
    var isoDate = isoDateTime.substring(0, 10)
    database.collection("newScores").add({
        name: name,
        score: score,
        difficulty: difficulty,
        datetime: isoDateTime,
        date: isoDate,
        level: level, 
        duration: duration
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
    const maxSeconds = 30;
    const [time, setTime] = React.useState({seconds: maxSeconds, max: maxSeconds});
    const [cards, setCards] = React.useState<GameCardContent[]>([]);
    const [scoresToday, setScoresToday] = React.useState<Score[]>([]);
    const [scores, setScores] = React.useState<Score[]>([]);
    const [level, setLevel] = React.useState(0);
    const [points, setPoints] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [streak, setStreak] = React.useState(1);
    const [initialOpen, setInitialOpen] = React.useState(true);
    const [leaderBoardOpen, setLeaderBoardOpen] = React.useState(false);
    const [gameOverOpen, setGameOverOpen] = React.useState(false);
    const [user, setUser] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("Easy");
    const [currentGameState, setcurrentGameState] = React.useState('init');

    const fetchData = ()=>{
        database.collection("newScores").where("difficulty", "==", difficulty).orderBy("score", "desc").limit(5).get().then((querySnapshot) => {
            // Loop through the data and store
            // it in array to display
            var new_scores: Score[] = []
            querySnapshot.forEach(item => {
                let record = item.data()
                var new_score = new Score({name: record.name, score: record.score, id: item.id})
                new_scores.push(new_score)
            });
            setScores(new_scores)
            console.log(new_scores.length)
        })
        var today = new Date();
        var tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var today_string = yyyy+'-'+mm+'-'+dd;

        dd = String(tomorrow.getDate()).padStart(2, '0');
        mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = tomorrow.getFullYear();
        var tomorrow_string = yyyy+'-'+mm+'-'+dd;
        console.log("Today: ", today_string)
        console.log("Tomorrow: ", tomorrow_string)

        database.collection("newScores").where("difficulty", "==", difficulty).orderBy("date").where("date", ">=", today_string).where("date", "<", tomorrow_string).orderBy("score", "desc").limit(5).get().then((querySnapshot) => {
            // Loop through the data and store
            // it in array to display
            var new_scores: Score[] = []
            querySnapshot.forEach(item => {
                let record = item.data()
                var new_score = new Score({name: record.name, score: record.score, id: item.id})
                new_scores.push(new_score)
            });
            console.log(new_scores.length)
            setScoresToday(new_scores)
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
            setGameOverOpen(true);
            writeUserData(user, points, difficulty, level, duration)
            return
        }
        setTime({seconds: time.seconds-1, max: maxSeconds})
        setDuration(duration+1)
    }

    const onCardComplete = () => {
        setPoints(points + streak)
        if (level > 0) { setStreak(streak + 1) }
        Math.min(time.seconds+1, maxSeconds)
    }

    const onCardMiss = () => {
        setStreak(1)
        if (difficulty === "Medium") {
            setPoints(points - 1)
        }
        if (difficulty === "Hard") {
            setPoints(points - 1)
            setTime({seconds: time.seconds-1, max: maxSeconds})
        }
        if (difficulty === "Lol") {
            setPoints(points - 10)
            // shuffleCards(level)
        }
    }
    
    const onComplete = () => {
        setLevel(level+1)
        setPoints(points + level)
        setTime({seconds: Math.min(time.seconds+Math.max(5-level, 1), maxSeconds), max: maxSeconds})
        for (var q in cards) {
            cards[q].isComplete = false
            cards[q].isFlipped = false
        }
        shuffleCards(level+1);
    }

    const handleInitialClose = (s: string, d: string) => {
        var substring = s.length > 10 ? 
            s.substring(0, 10) : 
            s;
        setInitialOpen(false)
        setUser(substring)
        shuffleCards(0);
        setcurrentGameState('play')
        setDifficulty(d);
        if (d === "Lol") {
            setTime({seconds:5, max:5})
        }
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
        setDuration(0)
        setPoints(0)
        fetchData()
        setTime({seconds: maxSeconds, max: maxSeconds})
        if (difficulty === "Lol") {
            setTime({seconds:5, max:5})
        }
        setcurrentGameState('leaderboard')
        setLeaderBoardOpen(true)
        setGameOverOpen(false);
    }

    return (
        <Container maxWidth="sm">
            <HUD onTick={onTick} timerState={time} level={level} points={points} name={user} multiplier={streak} difficulty={difficulty}></HUD>
            <GameCardContainer onComplete={onComplete} onCardComplete={onCardComplete} onCardMiss={onCardMiss} cards={cards}></GameCardContainer>
            { initialOpen && <InitialGameDialog
                open={initialOpen}
                onClose={handleInitialClose}
            /> }
            { leaderBoardOpen && <LeaderBoardDialog
                scores={scores}
                scoresToday={scoresToday}
                open={leaderBoardOpen}
                onClose={handleLeaderBoardClose}
                difficulty={difficulty}
            /> }
            { gameOverOpen && <GameOverDialog
                name={user}
                open={gameOverOpen}
                onClose={handleGameOverClose}
                points={points}
            /> }
        </Container>
    );
}

export default Game;