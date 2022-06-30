import { Question } from './Question';
import QuestionCard from "./QuestionCard";
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';


interface ProjectListProps {
  questions: Question[];
}

function QuestionContainer(props: ProjectListProps) {
  const [questionFlipped, setquestionFlipped] = useState({});
  const flipQuestion = (q: Question) => {
    setquestionFlipped(q);
    console.log(q);
  };
  const flipBack = () => {
    setquestionFlipped({});
  };
  const { questions } = props;
  const items = questions.map(q => (
    <Grid item xs={4}>
      {q === questionFlipped ? (
        <QuestionCard question={q} onFlip={flipQuestion} onCancel={flipBack} flipped={true}></QuestionCard>
      ) : (
        <QuestionCard question={q} onFlip={flipQuestion} onCancel={flipBack} flipped={false}></QuestionCard>
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
