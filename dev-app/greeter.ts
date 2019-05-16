import {defineEvent} from 'typed-delegates';
import {inject} from 'aurelia-framework';

export const GreetEvent = defineEvent<{ text: string }>('greet');

@inject(Element)
export class Greeter {
    public text = '';

    constructor(private readonly element: HTMLElement) {
    }

    public greet() {
        this.element.dispatchEvent(GreetEvent.create({ text: this.text }));
        this.text = '';
    }
}
