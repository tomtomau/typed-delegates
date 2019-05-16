import {EventFunctionCollection} from "../src";
import {GreetEvent} from "./greeter";

export class App {
  public message: string = 'from Aurelia!';
  public greeterDelegates: EventFunctionCollection;
  public greetings: string[] = [];

  constructor() {
    this.greeterDelegates = [
        GreetEvent.subscribe((event) => this.greetings.push(event.detail.text)),
    ];
  }
}
