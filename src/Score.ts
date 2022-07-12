
export class Score {
    score: number;
    name: string;
    id: string;
  
    constructor(initializer?: any) {
      this.id = initializer.id;
      this.score = initializer.score;
      this.name = initializer.name;
    }
  }