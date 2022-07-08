import React from 'react'
import { QUESTIONS } from './questions/MockQuestions';
import Game from './Game';

function App() {
  var initialQuestions = [];
  for (var q in QUESTIONS) {
    // console.log(q);
    initialQuestions.push(QUESTIONS[q]);
    initialQuestions.push({...QUESTIONS[q]});
    initialQuestions[initialQuestions.length-1].id += 10;
  }
  // initialQuestions = [].push.apply(QUESTIONS, QUESTIONS);
  initialQuestions = initialQuestions.sort( () => .5 - Math.random() );

  return (
    <Game initialQuestions={initialQuestions}/>
  );
}

export default App;
