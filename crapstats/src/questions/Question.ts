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
  answer: Answer;
  other_answers: Array<Answer>;
  name: string = '';
  short: string = '';
  full: string = '';
  isActive: boolean = false;

  constructor(initializer?: any) {
    this.id = initializer.id;
    this.category = initializer.category
    this.answer = initializer.answer
    this.other_answers = initializer.other_answers
    if (initializer.name) this.name = initializer.name;
    if (initializer.short) this.short = initializer.short;
    if (initializer.full) this.full = initializer.full;
    if (initializer.isActive) this.isActive = initializer.isActive;
  }
}