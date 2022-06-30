import { Question, Category, Answer } from './Question';

export const QUESTIONS = [
  new Question({
    id: 1,
    name: 'Johnson - Kutch',
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
    id: 1,
    name: 'Johnson - Kutch',
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
    id: 1,
    name: 'Johnson - Kutch',
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
