export class EventFunction<T> {
    constructor(private eventType: string, private callback: (event?: CustomEvent<T>) => void) {
    }

    public getEventType(): string {
        return this.eventType;
    }

    public execute(event: CustomEvent<T>): void {
        this.callback(event);
    }
}
