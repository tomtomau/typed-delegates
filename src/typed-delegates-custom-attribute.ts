import {delegationStrategy, EventManager, inject} from 'aurelia-framework';
import {EventFunction} from './event-function';

@inject(Element, EventManager)
export class TypedDelegatesCustomAttribute {
    constructor(private element: Element, private eventManager: EventManager) {
    }

    public valueChanged(newValue: Array<EventFunction<any>>): void {
        for (const eventFunction of newValue) {
            this.eventManager.addEventListener(this.element, eventFunction.getEventType(), (e: CustomEvent<any>) => {
                eventFunction.execute(e);
            }, delegationStrategy.bubbling);
        }
    }
}
