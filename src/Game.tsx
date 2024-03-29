import React from 'react'
import GameCardContainer from './cards/GameCardContainer';
import { GameCardContent } from './cards/GameCardContent';
import { EASY_CARDS, MEDIUM_CARDS, HARD_CARDS } from './cards/MockCards';

import LeaderBoardDialog from './dialog/DialogLeaderBoard';
import InitialGameDialog from './dialog/DialogInitialGame';
import LoginDialog from './dialog/DialogLogin';
import {Score} from './dialog/Score';
import { database, auth } from "./dialog/Firebase"; 

import GameTopBar from './GameTopBar';
import GameStats from './GameStats';

import Container from '@mui/material/Container';


function writeUserData(score: number, difficulty: string, level: number, duration: number, name: string) {
    var isoDateTime = new Date().toISOString()
    var isoDate = isoDateTime.substring(0, 10)
    if (auth.currentUser == null) { return }
    database.collection("userScores/" + auth.currentUser?.uid + "/scores").add({
        uid: auth.currentUser?.uid,
        name: name,
        score: score,
        difficulty: difficulty,
        date: isoDate,
        level: level, 
        duration: duration
    })
    .then((docRef: any) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error: any) => {
        console.error("Error adding document: ", error);
    });

    database.collection("newScores").add({
        uid: auth.currentUser?.uid,
        name: name,
        score: score,
        difficulty: difficulty,
        date: isoDate,
        level: level, 
        duration: duration
    })
    .then((docRef: any) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error: any) => {
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
    const [difficulty, setDifficulty] = React.useState("Easy");
    const [currentGameState, setcurrentGameState] = React.useState('init');
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [isSignedIn, setIsSignedIn] = React.useState(false); // Local signed-in state.
    const [username, setUsername] = React.useState('');

    React.useEffect(() => {
        const timerId = setInterval(() => onTick(), 1000);
        return () => clearInterval(timerId);
    });

    // Listen to the Firebase Auth state and set the local state.
    React.useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
            console.log('auth state changed')
            console.log(user)
            setIsSignedIn(!!user);
            var name = auth.currentUser?.displayName as string
            var splitted = name.split(" ", 2);
            setUsername(splitted[0])
            setLoginOpen(false)
            resetGameState(difficulty)
            setcurrentGameState('start')
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

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

        database.collection("newScores").where("difficulty", "==", difficulty).orderBy("date").where("date", ">=", today_string).where("date", "<", tomorrow_string).orderBy("score", "desc").limit(5).get().then((querySnapshot) => {
            // Loop through the data and store
            // it in array to display
            var new_scores: Score[] = []
            querySnapshot.forEach(item => {
                let record = item.data()
                var new_score = new Score({name: record.name, score: record.score, id: item.id})
                new_scores.push(new_score)
            });
            setScoresToday(new_scores)
        })
    }

    const shuffleCards = (lev: number, diff: string) => {
        var shuffledCards : GameCardContent[] = [];
        if (diff === "Easy") {
            for (var q in EASY_CARDS) {shuffledCards.push(EASY_CARDS[q]);}
        }
        if (diff === "Medium") {
            for (var q in MEDIUM_CARDS) {shuffledCards.push(MEDIUM_CARDS[q]);}
        }
        if (diff === "Hard") {
            for (var q in HARD_CARDS) {shuffledCards.push(HARD_CARDS[q]);}
        }
        shuffledCards = shuffledCards.sort( () => .5 - Math.random() ); // not good rando... 
        if (lev > 5) { shuffledCards = shuffle(shuffledCards) } // better...
        setCards(shuffledCards)
    }

    const resetGameState = (diff: string) => {
        for (var q in cards) {
            cards[q].isComplete = false
            cards[q].isFlipped = false
        }
        shuffleCards(0, diff);
        setLevel(0)
        setDuration(0)
        setPoints(0)
        setStreak(1)
        setTime({seconds: maxSeconds, max: maxSeconds})
        // if (difficulty === "Lol") {
        //     setTime({seconds:5, max:5})
        // }
    }

    const onDifficultyClick = () => {
        setInitialOpen(true)
        setcurrentGameState('init')
    }

    const onScoresClick = () => {
        setcurrentGameState('leaderboard')
        setLeaderBoardOpen(true);
        fetchData()
    }

    const onLoginClick = () => {
        setLoginOpen(true)
        setcurrentGameState('login')
    }

    const onLogoutClick = () => {
        auth.signOut()
        setLoginOpen(false)
        resetGameState(difficulty)
        setcurrentGameState('start')
    }

    const onTick = () => {
        if (currentGameState != 'play') {
            return
        }
        if (time.seconds <= 0) {
            setcurrentGameState('leaderboard')
            setLeaderBoardOpen(true);
            writeUserData(points, difficulty, level, duration, username)
            fetchData()
            return
        }
        setTime({seconds: time.seconds-1, max: maxSeconds})
        setDuration(duration+1)
    }

    const onCardClick = () => {
        console.log('card click!')
        if (currentGameState === 'start') {
            setcurrentGameState('play')
        }
    }

    const onCardComplete = () => {
        setPoints(points + streak)
        setStreak(streak + 1)
    }

    const onCardMiss = () => {
        setStreak(1)
        // if (difficulty === "Medium") {
        //     setPoints(points - 1)
        // }
        // if (difficulty === "Hard") {
        //     setPoints(points - 1)
        //     setTime({seconds: time.seconds-1, max: maxSeconds})
        // }
    }
    
    const onComplete = () => {
        setLevel(level+1)
        setPoints(points + level)
        setTime({seconds: Math.min(time.seconds+Math.max(5-level, 1), maxSeconds), max: maxSeconds})
        for (var q in cards) {
            cards[q].isComplete = false
            cards[q].isFlipped = false
        }
        shuffleCards(level+1, difficulty);
    }

    const handleInitialClose = (d: string) => {
        setInitialOpen(false)
        setcurrentGameState('start')
        setDifficulty(d);
        resetGameState(d);
    }

    const handleLeaderBoardClose = () => {
        resetGameState(difficulty)
        setLeaderBoardOpen(false)
        setcurrentGameState('start')
        setScores([])
        setScoresToday([])
    }

    return (
        <Container maxWidth="sm">
            <GameTopBar 
                timerState={time}
                isSignedIn={isSignedIn}
                onScoresClick={onScoresClick} 
                onLoginClick={onLoginClick} 
                onLogoutClick={onLogoutClick}
                username={username}></GameTopBar>
            <GameCardContainer onComplete={onComplete} onCardClick={onCardClick} onCardComplete={onCardComplete} onCardMiss={onCardMiss} cards={cards}></GameCardContainer>
            { initialOpen && <InitialGameDialog
                open={initialOpen}
                onClose={handleInitialClose}
            /> }
            { leaderBoardOpen && <LeaderBoardDialog
                scores={scores}
                scoresToday={scoresToday}
                open={leaderBoardOpen}
                onClose={handleLeaderBoardClose}
                points={points}
                difficulty={difficulty}
            /> }
            { loginOpen && <LoginDialog open={loginOpen}/> }
            <GameStats level={level} points={points} multiplier={streak} difficulty={difficulty} onDifficultyClick={onDifficultyClick}></GameStats>
        </Container>
    );
}

export default Game;