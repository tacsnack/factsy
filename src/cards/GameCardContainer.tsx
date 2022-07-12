import { GameCardContent } from './GameCardContent';
import GameCard from "./GameCard";
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';


interface ContainerProps {
  cards: GameCardContent[];
  onComplete: () => void;
  onCardComplete: () => void;
  onCardMiss: () => void;
}

function isComplete(element: any, index: any, array: any) { 
  return (element.isComplete); 
} 

function GameCardContainer(props: ContainerProps) {
  const [lastFlipped, setlastFlipped] = useState({});
  const { cards, onComplete, onCardComplete, onCardMiss } = props;
  const flipQuestion = (q: GameCardContent) => {
    if (q.isComplete) {
      return;
    }
    // console.log(lastFlipped);
    if (Object.keys(lastFlipped).length != 0) {
      const flip = lastFlipped as GameCardContent;
      if (q == flip) { // Same card
        return
      }
      else if (q.color == flip.color) { // Correct card
        q.isFlipped = true;
        flip.isComplete = true;
        q.isComplete = true;
        onCardComplete();
        setlastFlipped({});
      }
      else { // Wrong card
        flip.isFlipped = false;
        setlastFlipped(q);
        q.isFlipped = true;
        onCardMiss();
      }
    }
    else {
      setlastFlipped(q);
      q.isFlipped = true;
    }    
    if (cards.every(isComplete)) {
      onComplete();
    }
  };
  const flipCheck = (q: GameCardContent) => {
    console.log("Just Checking");
  };
  const items = cards.map(q => (
    <Grid key={q.id} item xs={4}>
      <GameCard card={q} onFlip={flipQuestion} onCheck={flipCheck} flipped={q.isFlipped}></GameCard>
    </Grid>
  ));
  
  return (
    <Grid container spacing={2} alignItems="center" justifyContent='center' >
      {items}
    </Grid>
  );
}

export default GameCardContainer;
