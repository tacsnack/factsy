import { Question } from './Question';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
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
    question: Question;
    onFlip: (question: Question) => void;
    onCheck: (question: Question) => void;
    flipped: boolean;
}


function QuestionCard(props: CardProps) {
  const [questionFlipped, setquestionFlipped] = useState({});
  const { question, onFlip, onCheck, flipped} = props;
  return (
    <Card 
      style={flipped ? cardStyleFlipped(question.color) : defaultCardStyle} 
      onClick={() => { flipped ? onCheck(question) : onFlip(question)}}>
      { flipped ? (
        <CardContent>
          <h4 className="strong">&#128054;</h4>
        </CardContent>
      ) : (
        <CardContent >
          <h5 className="strong"><strong>?</strong></h5>
        </CardContent>
      )}
    </Card>
  );
}

export default QuestionCard;
