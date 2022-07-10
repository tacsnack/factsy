import { GameCardContent } from './GameCardContent';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';

const defaultCardStyle = {
  backgroundColor: "#fafafa",
  display: "block",
  transitionDuration: "0.3s",
};


function cardStyleFlipped(color: string) {
  return {
    backgroundColor: color,
    transitionDuration: "0.3s",
  };
}

interface CardProps {
    card: GameCardContent;
    onFlip: (gameCard: GameCardContent) => void;
    onCheck: (gameCard: GameCardContent) => void;
    flipped: boolean;
}

function GameCard(props: CardProps) {
  const { card, onFlip, onCheck, flipped} = props;
  return (
    <Card 
      style={flipped ? cardStyleFlipped(card.color) : defaultCardStyle} 
      onClick={() => { flipped ? onCheck(card) : onFlip(card)}}>
      <Box sx={{ justifyContent: 'center', textAlign: 'center', fontSize: '1.2rem'}}>
        { flipped ? (
          <CardContent>
            <h5 className="strong">
              <span role="img" aria-label="label">
                  {String.fromCodePoint(card.name)}
              </span>
            </h5>
          </CardContent>
        ) : (
          <CardContent >
            <h5 className="strong">
              <span role="img" aria-label="label">
                  {String.fromCodePoint(0x2754)}
              </span>
            </h5>
          </CardContent>
        )}
      </Box>
    </Card>
  );
}

export default GameCard;
