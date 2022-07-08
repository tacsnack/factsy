import { Question } from './Question';
import QuestionCard from "./QuestionCard";
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';


interface ProjectListProps {
  questions: Question[];
  onComplete: () => void;
}

function isComplete(element: any, index: any, array: any) { 
  return (element.isComplete); 
} 

function QuestionContainer(props: ProjectListProps) {
  const [lastFlipped, setlastFlipped] = useState({});
  const { questions, onComplete } = props;
  const flipQuestion = (q: Question) => {
    if (q.isComplete) {
      return;
    }
    console.log(lastFlipped);
    if (Object.keys(lastFlipped).length != 0) {
      const flip = lastFlipped as Question;
      if (q == flip) {
        return
      }
      else if (q.color == flip.color) {
        q.isFlipped = true;
        flip.isComplete = true;
        q.isComplete = true;
        setlastFlipped({});
      }
      else {
        flip.isFlipped = false;
        setlastFlipped(q);
        q.isFlipped = true;
      }
    }
    else {
      setlastFlipped(q);
      q.isFlipped = true;
    }    
    if (questions.every(isComplete)) {
      onComplete();
    }
  };
  const flipCheck = (q: Question) => {
    console.log("Just Checking");
  };
  const items = questions.map(q => (
    <Grid item xs={4}>
      {q.isFlipped ? (
        <QuestionCard key={q.id} question={q} onFlip={flipQuestion} onCheck={flipCheck} flipped={true}></QuestionCard>
      ) : (
        <QuestionCard key={q.id} question={q} onFlip={flipQuestion} onCheck={flipCheck} flipped={false}></QuestionCard>
      )}
    </Grid>
  ));
  
  return (
    <Grid container spacing={2} alignItems="stretch">
      {items}
    </Grid>
  );
}

export default QuestionContainer;
