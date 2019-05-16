import { DOM } from 'aurelia-framework';
import {EventFunction} from "./event-function";

declare type EventHandler<T> = (event: CustomEvent<T>) => unknown;
export type EventFunctionCollection = Array<EventFunction<unknown>>;

function subscriber<T>(eventType: string): (callback: EventHandler<T>) => EventFunction<T> {
    return (callback) => {
        return new EventFunction<T>(eventType, callback);
    };
}

function creator<T>(eventType: string): ((detail: T, bubbles: boolean) => CustomEvent<T>) {
    return (detail: T, bubbles = true) => {
        return DOM.createCustomEvent(eventType, { bubbles, detail });
    };
}

export interface EventDefinition<T> {
    readonly type: string;
    readonly subscribe: (callback: EventHandler<T>) => EventFunction<T>;
    readonly create: (detail: T, bubbles?: boolean) => CustomEvent<T>;
}

export function defineEvent<T>(eventType: string): EventDefinition<T> {
    return {
        type: eventType,
        subscribe: subscriber<T>(eventType),
        create: creator<T>(eventType),
    };
}
