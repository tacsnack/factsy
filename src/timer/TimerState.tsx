
export class TimerState {
    seconds: number;

    constructor(initializer?: any) {
        this.seconds = initializer.seconds;
    }
}
export default TimerState;