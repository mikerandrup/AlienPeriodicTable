var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SearchTiles;
(function (SearchTiles) {
    var Actions;
    (function (Actions) {
        var ActionBase = (function () {
            function ActionBase() {
                this.Payload = {};
            }
            return ActionBase;
        }());
        Actions.ActionBase = ActionBase;
    })(Actions = SearchTiles.Actions || (SearchTiles.Actions = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Actions;
    (function (Actions) {
        (function (ACTION_TYPES) {
        })(Actions.ACTION_TYPES || (Actions.ACTION_TYPES = {}));
        var ACTION_TYPES = Actions.ACTION_TYPES;
        ;
    })(Actions = SearchTiles.Actions || (SearchTiles.Actions = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Utils;
    (function (Utils) {
        // Based on Jerome Etienne's "MicroEvent" package
        // https://github.com/jeromeetienne/microevent.js
        // Why? 15 lines of code and it's well tested.
        var registeredEvents = {};
        Utils.EventEmitter = {
            on: function (eventName, handler) {
                registeredEvents[eventName] = registeredEvents[eventName] || [];
                registeredEvents[eventName].push(handler);
            },
            off: function (eventName, handler) {
                if (eventName in registeredEvents === false)
                    return;
                registeredEvents[eventName].splice(registeredEvents[eventName].indexOf(handler), 1);
            },
            trigger: function (eventName, eventPayload) {
                if (eventName in registeredEvents === false)
                    return;
                for (var i = 0; i < registeredEvents[eventName].length; i++) {
                    registeredEvents[eventName][i].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }
        };
    })(Utils = SearchTiles.Utils || (SearchTiles.Utils = {}));
})(SearchTiles || (SearchTiles = {}));
/// <reference path="actionbase.ts" />
/// <reference path="../Utils/eventemitter.ts" />
var SearchTiles;
(function (SearchTiles) {
    var Actions;
    (function (Actions) {
        var EventEmitter = SearchTiles.Utils.EventEmitter;
        var NAME_FOR_ALL_ACTION_EVENTS = "ACTION";
        Actions.Dispatcher = {
            subscribeToActions: function (actionHandler) {
                EventEmitter.on(NAME_FOR_ALL_ACTION_EVENTS, actionHandler);
            },
            unsubscribeFromActions: function (actionHandler) {
                EventEmitter.off(NAME_FOR_ALL_ACTION_EVENTS, actionHandler);
            },
            dispatch: function (actionToDispatch) {
                EventEmitter.trigger(NAME_FOR_ALL_ACTION_EVENTS, actionToDispatch);
            }
        };
    })(Actions = SearchTiles.Actions || (SearchTiles.Actions = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Utils;
    (function (Utils) {
        var AppStart;
        (function (AppStart) {
            function RegisterDomReadyFunction(readyCallback) {
                document.addEventListener("DOMContentLoaded", readyCallback, false);
            }
            AppStart.RegisterDomReadyFunction = RegisterDomReadyFunction;
        })(AppStart = Utils.AppStart || (Utils.AppStart = {}));
    })(Utils = SearchTiles.Utils || (SearchTiles.Utils = {}));
})(SearchTiles || (SearchTiles = {}));
/// <reference path="Utils/appstart.ts" />
/// <reference path="../librarydefinitions/react-stub.d.ts" />
var SearchTiles;
(function (SearchTiles) {
    var RegisterDOMReadyFunction = SearchTiles.Utils.AppStart.RegisterDomReadyFunction;
    var Application = React.createClass({
        render: function () {
            return (React.createElement("div", null, "React is working, and has mounted the \"Root Component\"."));
        }
    });
    // This root application component gets to reach into the DOM.
    // Such things won't typically happen anywhere else.
    function InitializeApplication() {
        // Feel free to get rid of this thing immediately after seeing it work.
        alert("TypeScript is working, and the compiled javascript has loaded on the page.");
        // This tells ReactDOM to mount the root component in the DOM
        ReactDOM.render(React.createElement(Application, null), document.getElementById('application'));
        // TODO: Define Application LifeCycle actions and trigger one here
        //  - This kicks off everything going on in the Flux pattern
    }
    // This binds our startup to the DOM being ready
    RegisterDOMReadyFunction(InitializeApplication);
})(SearchTiles || (SearchTiles = {}));
/// <reference path="../actions/actionbase.ts" />
/// <reference path="../actions/dispatcher.ts" />
/// <reference path="../Utils/eventemitter.ts" /> 
var SearchTiles;
(function (SearchTiles) {
    var Stores;
    (function (Stores) {
        var EventEmitter = SearchTiles.Utils.EventEmitter;
        var Dispatcher = SearchTiles.Actions.Dispatcher;
        var BASE_NAME_OF_CHANGE_EVENTS = "CHANGE-";
        var NULL_PAYLOAD_FOR_EVENTS = {};
        var StoreBase = (function () {
            function StoreBase(nameOfDerivedStore) {
                this.StoreSpecificChangeEventName = BASE_NAME_OF_CHANGE_EVENTS + nameOfDerivedStore;
                Dispatcher.subscribeToActions(this.HandleTheFactAnActionHappened.bind(this));
            }
            // Components will use this to be notified of data updates
            StoreBase.prototype.RegisterChangeHandler = function (changeCallback) {
                EventEmitter.on(this.StoreSpecificChangeEventName, changeCallback);
            };
            // When a component is about to go away, it should call this
            StoreBase.prototype.DeRegisterChangeHandler = function (changeCallback) {
                EventEmitter.off(this.StoreSpecificChangeEventName, changeCallback);
            };
            // Derived stores call this to tell components something has changed
            StoreBase.prototype.EmitChange = function () {
                EventEmitter.trigger(this.StoreSpecificChangeEventName, NULL_PAYLOAD_FOR_EVENTS);
            };
            // Allows store to know about actions in the app
            StoreBase.prototype.HandleTheFactAnActionHappened = function (action) {
                // by default, do nothing.
                // override in derived stores as needed
            };
            return StoreBase;
        }());
        Stores.StoreBase = StoreBase;
    })(Stores = SearchTiles.Stores || (SearchTiles.Stores = {}));
})(SearchTiles || (SearchTiles = {}));
/// <reference path="storebase.ts" />
var SearchTiles;
(function (SearchTiles) {
    var Stores;
    (function (Stores) {
        // This is used to namespace change events to this store only
        var NAME_OF_STORE = "MyExampleDerivedStore";
        var MyExampleDerivedStore = (function (_super) {
            __extends(MyExampleDerivedStore, _super);
            function MyExampleDerivedStore() {
                _super.call(this, NAME_OF_STORE);
            }
            return MyExampleDerivedStore;
        }(Stores.StoreBase));
    })(Stores = SearchTiles.Stores || (SearchTiles.Stores = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Utils;
    (function (Utils) {
        function AjaxDataGetter(url, callback) {
            var xhrObject = new XMLHttpRequest();
            xhrObject.onreadystatechange = function (response) {
                if (xhrObject.readyState === 4) {
                    callback(JSON.parse(xhrObject.responseText));
                }
            };
            xhrObject.open("GET", url, true);
            xhrObject.send();
        }
        Utils.AjaxDataGetter = AjaxDataGetter;
    })(Utils = SearchTiles.Utils || (SearchTiles.Utils = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Utils;
    (function (Utils) {
        // I decided to drop this in, and lose the `lodash` dep
        // Thank you to Remy Sharp https://remysharp.com/2010/07/21/throttling-function-calls
        function Throttle(functionToThrottle, threshholdMilliseconds, theThisContext) {
            threshholdMilliseconds || (threshholdMilliseconds = 250);
            var last, deferTimer;
            return function () {
                var context = theThisContext || this;
                var now = +new Date, args = arguments;
                if (last && now < last + threshholdMilliseconds) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        functionToThrottle.apply(context, args);
                    }, threshholdMilliseconds);
                }
                else {
                    last = now;
                    functionToThrottle.apply(context, args);
                }
            };
        }
        Utils.Throttle = Throttle;
    })(Utils = SearchTiles.Utils || (SearchTiles.Utils = {}));
})(SearchTiles || (SearchTiles = {}));
//# sourceMappingURL=compiledtypescript.js.map