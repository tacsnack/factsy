export class GameCardContent {
  id: number;
  match_id: number;
  color: string;
  name: number;
  isFlipped: boolean = false;
  isComplete: boolean = false;

  constructor(initializer?: any) {
    this.id = initializer.id;
    this.match_id = initializer.match_id;
    this.color = initializer.color;
    this.name = initializer.name;
    if (initializer.isFlipped) this.isFlipped = initializer.isFlipped;
    if (initializer.isComplete) this.isComplete = initializer.isComplete;
  }
}