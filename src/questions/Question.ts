export enum Category {
  History = "History",
  Science = "Science",
  Movies = "Movies",
  Music = "Music",
}

export class Answer {
  id: number;
  text: string = '';
    
  constructor(initializer?: any) {
    this.id = initializer.id;
    if (initializer.text) this.text = initializer.text;
  }
}

export class Question {
  id: number;
  category: Category;
  color: string;
  answer: Answer;
  other_answers: Array<Answer>;
  name: string = '';
  short: string = '';
  full: string = '';
  isFlipped: boolean = false;
  isComplete: boolean = false;

  constructor(initializer?: any) {
    this.id = initializer.id;
    this.category = initializer.category;
    this.color = initializer.color;
    this.answer = initializer.answer;
    this.other_answers = initializer.other_answers;
    if (initializer.name) this.name = initializer.name;
    if (initializer.short) this.short = initializer.short;
    if (initializer.full) this.full = initializer.full;
    if (initializer.isFlipped) this.isFlipped = initializer.isFlipped;
    if (initializer.isComplete) this.isComplete = initializer.isComplete;
  }
}