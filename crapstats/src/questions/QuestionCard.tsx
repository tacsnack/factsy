import { Question } from './Question';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const cardStyle = {
  display: "block",
  transitionDuration: "0.3s",
  height: "20vw"
};

const cardNotSelectedStyle = {
  backgroundColor: '#1A2027',
  transitionDuration: "0.3s",
  height: "20vw"
};


interface CardProps {
    question: Question;
    onFlip: (question: Question) => void;
    onCancel: () => void;
    flipped: boolean;
}

function QuestionCard(props: CardProps) {
  const [questionFlipped, setquestionFlipped] = useState({});
  const { question, onFlip, onCancel, flipped} = props;
  return (
    <Card style={ flipped ? cardStyle : cardNotSelectedStyle }>
      {flipped ? (
        <CardContent>
          <h5 className="strong"><strong>{question.name}</strong></h5>
          <p>{question.full}</p>
          <Button variant="contained"onClick={() => {onCancel();}}>
            <span className="icon-edit "></span>
            Flip
          </Button>
        </CardContent>
      ) : (
        <CardContent>
          <h5 className="strong"><strong>Flip Me</strong></h5>
          <Button variant="contained"onClick={() => {onFlip(question);}}>
            <span className="icon-edit "></span>
            Flip
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default QuestionCard;
