import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./typed-delegates-custom-attribute')
  ]);
}

export * from './event-function';
export * from './define-event';
