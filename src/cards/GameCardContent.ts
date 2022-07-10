export class GameCardContent {
  id: number;
  color: string;
  name: number;
  isFlipped: boolean = false;
  isComplete: boolean = false;

  constructor(initializer?: any) {
    this.id = initializer.id;
    this.color = initializer.color;
    this.name = initializer.name;
    if (initializer.isFlipped) this.isFlipped = initializer.isFlipped;
    if (initializer.isComplete) this.isComplete = initializer.isComplete;
  }
}