
import { Question, Category, Answer } from './Question';
import { colors } from '@mui/material';

export const QUESTIONS = [
  new Question({
    id: 1,
    name: 'Blue',
    color: colors.blue[500],
    category: Category.History,
    short: 'who dis?',
    full: 'what does dis full question mean?',
    isActive: false,
    answer: new Answer({id: 1, text: 'Its the winner'}),
    other_answers: [
      new Answer({id: 2, text: 'Its not the winner'}),
      new Answer({id: 2, text: 'Its 2not the winner'}),
      new Answer({id: 2, text: 'Its 3not the winner'})
    ]
  }),
  new Question({
    id: 2,
    name: 'Master Question',
    color: colors.red[500],
    category: Category.History,
    short: 'who dis?',
    full: 'Who is the prime master question asker?',
    isActive: false,
    answer: new Answer({id: 1, text: 'Its the first person'}),
    other_answers: [
      new Answer({id: 2, text: 'Its not the winner'}),
      new Answer({id: 2, text: 'Its 2not the winner'}),
      new Answer({id: 2, text: 'Its 3not the winner'})
    ]
  }),
  new Question({
    id: 3,
    name: 'Johnson - Kutch',
    color: colors.green[500],
    category: Category.History,
    short: 'who dis?',
    full: 'what does dis full question mean?',
    isActive: false,
    answer: new Answer({id: 1, text: 'Its the winner'}),
    other_answers: [
      new Answer({id: 2, text: 'Its not the winner'}),
      new Answer({id: 2, text: 'Its 2not the winner'}),
      new Answer({id: 2, text: 'Its 3not the winner'})
    ]
  }),
  new Question({
    id: 4,
    name: 'Master Question',
    color: colors.yellow[500],
    category: Category.History,
    short: 'who dis?',
    full: 'Who is the prime master question asker?',
    isActive: false,
    answer: new Answer({id: 1, text: 'Its the first person'}),
    other_answers: [
      new Answer({id: 2, text: 'Its not the winner'}),
      new Answer({id: 2, text: 'Its 2not the winner'}),
      new Answer({id: 2, text: 'Its 3not the winner'})
    ]
  }),
  new Question({
    id: 5,
    name: 'Master Question',
    color: colors.purple[500],
    category: Category.History,
    short: 'who dis?',
    full: 'Who is the prime master question asker?',
    isActive: false,
    answer: new Answer({id: 1, text: 'Its the first person'}),
    other_answers: [
      new Answer({id: 2, text: 'Its not the winner'}),
      new Answer({id: 2, text: 'Its 2not the winner'}),
      new Answer({id: 2, text: 'Its 3not the winner'})
    ]
  }),
  new Question({
    id: 5,
    name: 'Master Question',
    color: colors.pink[500],
    category: Category.History,
    short: 'who dis?',
    full: 'Who is the prime master question asker?',
    isActive: false,
    answer: new Answer({id: 1, text: 'Its the first person'}),
    other_answers: [
      new Answer({id: 2, text: 'Its not the winner'}),
      new Answer({id: 2, text: 'Its 2not the winner'}),
      new Answer({id: 2, text: 'Its 3not the winner'})
    ]
  })
];
