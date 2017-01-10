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
        (function (ACTION_NAMES) {
            ACTION_NAMES[ACTION_NAMES["APPLICATION_STARTED"] = 0] = "APPLICATION_STARTED";
            ACTION_NAMES[ACTION_NAMES["APPLICATION_SHUTDOWN"] = 1] = "APPLICATION_SHUTDOWN";
        })(Actions.ACTION_NAMES || (Actions.ACTION_NAMES = {}));
        var ACTION_NAMES = Actions.ACTION_NAMES;
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
/// <reference path="../util/eventemitter.ts" />
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
                console.log("Action Happened: " + actionToDispatch.Name);
                EventEmitter.trigger(NAME_FOR_ALL_ACTION_EVENTS, actionToDispatch);
            }
        };
    })(Actions = SearchTiles.Actions || (SearchTiles.Actions = {}));
})(SearchTiles || (SearchTiles = {}));
/// <reference path="actionbase.ts" />
/// <reference path="dispatcher.ts" />
/// <reference path="actionnames.ts" />
var SearchTiles;
(function (SearchTiles) {
    var Actions;
    (function (Actions) {
        var Lifecyle;
        (function (Lifecyle) {
            function ApplicationStarted() {
                var appStartedAction = new Actions.ActionBase();
                appStartedAction.Name = Actions.ACTION_NAMES.APPLICATION_STARTED;
                Actions.Dispatcher.dispatch(appStartedAction);
            }
            Lifecyle.ApplicationStarted = ApplicationStarted;
        })(Lifecyle = Actions.Lifecyle || (Actions.Lifecyle = {}));
    })(Actions = SearchTiles.Actions || (SearchTiles.Actions = {}));
})(SearchTiles || (SearchTiles = {}));
;
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
var SearchTiles;
(function (SearchTiles) {
    var Components;
    (function (Components) {
        Components.ElementTile = React.createClass({
            render: function () {
                return React.createElement("div", null, "I am an ElementTile component!");
            }
        });
    })(Components = SearchTiles.Components || (SearchTiles.Components = {}));
})(SearchTiles || (SearchTiles = {}));
/// <reference path="actions/lifecycleactions.ts" />
/// <reference path="util/appstart.ts" />
/// <reference path="components/elementtile.tsx" />
/// <reference path="../librarydefinitions/react-stub.d.ts" />
var SearchTiles;
(function (SearchTiles) {
    var RegisterDOMReadyFunction = SearchTiles.Utils.AppStart.RegisterDomReadyFunction;
    var TriggerApplicationStartedAction = SearchTiles.Actions.Lifecyle.ApplicationStarted;
    var ElementTileComponent = SearchTiles.Components.ElementTile;
    var Application = React.createClass({
        render: function () {
            return (React.createElement("div", null, "Hey, look! React initialized and mounted the root component!", React.createElement(ElementTileComponent, null)));
        }
    });
    // This root application component gets to reach into the DOM.
    // Such things won't happen anywhere else.
    function InitializeApplication() {
        // This tells ReactDOM to mount the root component in the DOM
        ReactDOM.render(React.createElement(Application, null), document.getElementById('application'));
        // This kicks off everything going on in the Flux pattern
        TriggerApplicationStartedAction();
    }
    // This binds our startup to the DOM being ready
    RegisterDOMReadyFunction(InitializeApplication);
})(SearchTiles || (SearchTiles = {}));
/// <reference path="../util/eventemitter.ts" />
var SearchTiles;
(function (SearchTiles) {
    var Stores;
    (function (Stores) {
        var EventEmitter = SearchTiles.Utils.EventEmitter;
        var BaseStore = (function () {
            function BaseStore() {
            }
            return BaseStore;
        }());
        Stores.BaseStore = BaseStore;
        changeEmitter: EventEmitter;
    })(Stores = SearchTiles.Stores || (SearchTiles.Stores = {}));
})(SearchTiles || (SearchTiles = {}));
//# sourceMappingURL=compiledtypescript.js.map