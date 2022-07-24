
export class Score {
    score: number;
    name: string;
    id: string;
    difficulty: string = 'medium';
  
    constructor(initializer?: any) {
      this.id = initializer.id;
      this.score = initializer.score;
      this.name = initializer.name;
      if (initializer.difficulty) this.difficulty = initializer.difficulty;
    }
  }