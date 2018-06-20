export class HMEvent {
    constructor(
        public type: string,
        public amount: number,
        public category: number,
        public id?: number
    ) {}
}