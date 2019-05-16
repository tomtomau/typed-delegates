define('__dot_dot__/src/define-event',["require", "exports", "aurelia-framework", "./event-function"], function (require, exports, aurelia_framework_1, event_function_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function subscriber(eventType) {
        return function (callback) {
            return new event_function_1.EventFunction(eventType, callback);
        };
    }
    function creator(eventType) {
        return function (detail, bubbles) {
            if (bubbles === void 0) { bubbles = true; }
            return aurelia_framework_1.DOM.createCustomEvent(eventType, { bubbles: bubbles, detail: detail });
        };
    }
    function defineEvent(eventType) {
        return {
            type: eventType,
            subscribe: subscriber(eventType),
            create: creator(eventType),
        };
    }
    exports.defineEvent = defineEvent;
});
;
define('__dot_dot__/src/event-function',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventFunction = (function () {
        function EventFunction(eventType, callback) {
            this.eventType = eventType;
            this.callback = callback;
        }
        EventFunction.prototype.getEventType = function () {
            return this.eventType;
        };
        EventFunction.prototype.execute = function (event) {
            this.callback(event);
        };
        return EventFunction;
    }());
    exports.EventFunction = EventFunction;
});
;
define('__dot_dot__/src/index',["require", "exports", "aurelia-pal", "./event-function", "./define-event"], function (require, exports, aurelia_pal_1, event_function_1, define_event_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./typed-delegates-custom-attribute')
        ]);
    }
    exports.configure = configure;
    __export(event_function_1);
    __export(define_event_1);
});
;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('__dot_dot__/src/typed-delegates-custom-attribute',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TypedDelegatesCustomAttribute = (function () {
        function TypedDelegatesCustomAttribute(element, eventManager) {
            this.element = element;
            this.eventManager = eventManager;
        }
        TypedDelegatesCustomAttribute.prototype.valueChanged = function (newValue) {
            var _loop_1 = function (eventFunction) {
                this_1.eventManager.addEventListener(this_1.element, eventFunction.getEventType(), function (e) {
                    eventFunction.execute(e);
                }, aurelia_framework_1.delegationStrategy.bubbling);
            };
            var this_1 = this;
            for (var _i = 0, newValue_1 = newValue; _i < newValue_1.length; _i++) {
                var eventFunction = newValue_1[_i];
                _loop_1(eventFunction);
            }
        };
        TypedDelegatesCustomAttribute = __decorate([
            aurelia_framework_1.inject(Element, aurelia_framework_1.EventManager),
            __metadata("design:paramtypes", [Element, aurelia_framework_1.EventManager])
        ], TypedDelegatesCustomAttribute);
        return TypedDelegatesCustomAttribute;
    }());
    exports.TypedDelegatesCustomAttribute = TypedDelegatesCustomAttribute;
});
;
define('app',["require", "exports", "./greeter"], function (require, exports, greeter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
            var _this = this;
            this.message = 'from Aurelia!';
            this.greetings = [];
            this.greeterDelegates = [
                greeter_1.GreetEvent.subscribe(function (event) { return _this.greetings.push(event.detail.text); }),
            ];
        }
        return App;
    }());
    exports.App = App;
});
;
define('text!app.html',[],function(){return "<template>\n    <require from=\"./greeter\"></require>\n\n    <p>Greetings:</p>\n\n    <ul>\n        <li repeat.for=\"greeting of greetings\">${greeting}</li>\n    </ul>\n\n    <greeter typed-delegates.bind=\"greeterDelegates\"></greeter>\n</template>\n";});;
define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});
;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('greeter',["require", "exports", "typed-delegates", "aurelia-framework"], function (require, exports, typed_delegates_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GreetEvent = typed_delegates_1.defineEvent('greet');
    var Greeter = (function () {
        function Greeter(element) {
            this.element = element;
            this.text = '';
        }
        Greeter.prototype.greet = function () {
            this.element.dispatchEvent(exports.GreetEvent.create({ text: this.text }));
            this.text = '';
        };
        Greeter = __decorate([
            aurelia_framework_1.inject(Element),
            __metadata("design:paramtypes", [HTMLElement])
        ], Greeter);
        return Greeter;
    }());
    exports.Greeter = Greeter;
});
;
define('text!greeter.html',[],function(){return "<template>\n    <label for=\"greetText\">Greet text:</label>\n\n    <input id=\"greetText\" type=\"text\" value.bind=\"text\">\n\n    <button click.delegate=\"greet()\">Greet</button>\n</template>\n";});;
define('main',["require", "exports", "./environment", "core-js/stable"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('typed-delegates');
        aurelia.use.developmentLogging(environment_1.default.debug ? 'debug' : 'warn');
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

//# sourceMappingURL=app-bundle.js.map