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
            ACTION_TYPES[ACTION_TYPES["APPLICATION_STARTED"] = 0] = "APPLICATION_STARTED";
            ACTION_TYPES[ACTION_TYPES["APPLICATION_SHUTDOWN"] = 1] = "APPLICATION_SHUTDOWN";
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
/// <reference path="../utils/eventemitter.ts" />
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
/// <reference path="actionbase.ts" />
/// <reference path="dispatcher.ts" />
/// <reference path="actiontypes.ts" />
var SearchTiles;
(function (SearchTiles) {
    var Actions;
    (function (Actions) {
        var Lifecycle;
        (function (Lifecycle) {
            function ApplicationStarted() {
                var appStartedAction = new Actions.ActionBase();
                appStartedAction.ActionType = Actions.ACTION_TYPES.APPLICATION_STARTED;
                Actions.Dispatcher.dispatch(appStartedAction);
            }
            Lifecycle.ApplicationStarted = ApplicationStarted;
        })(Lifecycle = Actions.Lifecycle || (Actions.Lifecycle = {}));
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
/// <reference path="../actions/actionbase.ts" />
/// <reference path="../actions/dispatcher.ts" />
/// <reference path="../utils/eventemitter.ts" /> 
var SearchTiles;
(function (SearchTiles) {
    var Stores;
    (function (Stores) {
        var EventEmitter = SearchTiles.Utils.EventEmitter;
        var Dispatcher = SearchTiles.Actions.Dispatcher;
        var BASE_NAME_OF_CHANGE_EVENTS = "CHANGE-";
        var NULL_PAYLOAD_FOR_EVENTS = {};
        var StoreBase = (function () {
            function StoreBase() {
                // to be overridden in stores derived from this base
                this.NameOfStore = "NamelessStore";
                this.StoreSpecificChangeEventName = BASE_NAME_OF_CHANGE_EVENTS + this.NameOfStore;
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
/// <reference path="storebase.ts" />
/// <reference path="../utils/ajax.ts" />
/// <reference path="../actions/actionbase.ts" />
/// <reference path="../actions/actiontypes.ts" />
var SearchTiles;
(function (SearchTiles) {
    var Stores;
    (function (Stores) {
        var ACTION_TYPES = SearchTiles.Actions.ACTION_TYPES;
        var AjaxDataGetter = SearchTiles.Utils.AjaxDataGetter;
        var API_ENDPOINT = "/api/elementdata";
        var ElementTileStoreClass = (function (_super) {
            __extends(ElementTileStoreClass, _super);
            function ElementTileStoreClass() {
                _super.call(this);
                // For namespacing the emitting of changes
                this.NameOfStore = "ElementTileStore";
            }
            ElementTileStoreClass.prototype.getDataHasLoaded = function () {
                return _dataHasLoaded;
            };
            // deep copy so we don't pass around a mutable reference
            // to our single source of truth.  there are definite
            // performance penalties to doing this everywhere, so use your judgement
            ElementTileStoreClass.prototype.getElementCollection = function () {
                return _tileData.map(function (element) {
                    return {
                        Identity: element.Identity,
                        Name: element.Name,
                        Abbreviation: element.Abbreviation,
                        Hue: element.Hue
                    };
                });
            };
            ElementTileStoreClass.prototype.HandleTheFactAnActionHappened = function (action) {
                switch (action.ActionType) {
                    case ACTION_TYPES.APPLICATION_STARTED:
                        this.GoAskForData();
                        break;
                    default:
                }
            };
            // There are many patterns for this!  For simplicity, I'm
            // having the store go get the data and deal with it directly
            // Promises would have been nice here, but I'm keeping it simple
            ElementTileStoreClass.prototype.GoAskForData = function () {
                AjaxDataGetter(API_ENDPOINT, this.DealWithDataThatArrived.bind(this));
            };
            ElementTileStoreClass.prototype.DealWithDataThatArrived = function (apiData) {
                // there's no transformation we need to do except for an explicit type cast
                _tileData = apiData;
                _dataHasLoaded = true;
                // tell any listening components we've updated *something* 
                this.EmitChange();
            };
            return ElementTileStoreClass;
        }(Stores.StoreBase));
        // I'm hiding the store's private data here in the outer closure.
        // (Of course this means we had better not instantiate two stores)
        // I like to stub everything out so the components have runtime protection
        var _tileData = [];
        var _dataHasLoaded = false;
        // we export the actual constructed instance of the store
        Stores.ElementTileStore = new ElementTileStoreClass();
    })(Stores = SearchTiles.Stores || (SearchTiles.Stores = {}));
})(SearchTiles || (SearchTiles = {}));
/// <reference path="../stores/elementtilestore.ts" />
var SearchTiles;
(function (SearchTiles) {
    var Components;
    (function (Components) {
        Components.ElementTile = React.createClass({
            // in regular react you would use a "propTypes" declaration here
            /* propTypes = {
                tileData: IElementModel
            } */
            render: function () {
                // Your component now knows what the contract is with the store
                var tile = this.props.tileData;
                var backroundStyles = {
                    backgroundColor: "hsl(" + tile.Hue + ", 100%, 80%)"
                };
                return (React.createElement("div", {style: backroundStyles}, React.createElement("div", null, tile.Abbreviation), React.createElement("div", null, tile.Name), React.createElement("div", null, tile.Identity)));
            }
        });
    })(Components = SearchTiles.Components || (SearchTiles.Components = {}));
})(SearchTiles || (SearchTiles = {}));
/// <reference path="../stores/elementtilestore.ts" />
/// <reference path="elementtile.tsx" />
var SearchTiles;
(function (SearchTiles) {
    var Components;
    (function (Components) {
        var ElementTileStore = SearchTiles.Stores.ElementTileStore;
        Components.TileHolder = React.createClass({
            // has no props
            // again, there's lots of debate about whether there should
            // be a container layer that deals with all store data and actions
            // or if components should actually behave in a self sufficient way
            componentDidMount: function () {
                ElementTileStore.RegisterChangeHandler(this.handleStoreChange.bind(this));
            },
            componentWillUnmount: function () {
                ElementTileStore.DeRegisterChangeHandler(this.handleStoreChange.bind(this));
            },
            getInitialState: function () {
                return this.grabDataForState();
            },
            grabDataForState: function () {
                return {
                    dataIsReady: ElementTileStore.getDataHasLoaded(),
                    tileData: ElementTileStore.getElementCollection()
                };
            },
            handleStoreChange: function () {
                this.setState(this.grabDataForState());
            },
            renderWithData: function () {
                var childComponents = this.state.tileData.map(function (tile) {
                    return React.createElement(Components.ElementTile, {tileData: tile, key: tile.Identity});
                });
                return (React.createElement("div", null, childComponents));
            },
            renderLoadingIndicator: function () {
                return (React.createElement("div", null, "Like, loading the data and stuff.  Wait up for a sec."));
            },
            render: function () {
                return this.state.dataIsReady ?
                    this.renderWithData() :
                    this.renderLoadingIndicator();
            }
        });
    })(Components = SearchTiles.Components || (SearchTiles.Components = {}));
})(SearchTiles || (SearchTiles = {}));
/// <reference path="actions/lifecycleactions.ts" />
/// <reference path="utils/appstart.ts" />
/// <reference path="components/elementtile.tsx" />
/// <reference path="components/tileholder.tsx" />
/// <reference path="../librarydefinitions/react-stub.d.ts" />
var SearchTiles;
(function (SearchTiles) {
    var RegisterDOMReadyFunction = SearchTiles.Utils.AppStart.RegisterDomReadyFunction;
    var TriggerApplicationStartedAction = SearchTiles.Actions.Lifecycle.ApplicationStarted;
    var TileHolder = SearchTiles.Components.TileHolder;
    var Application = React.createClass({
        render: function () {
            return (React.createElement("div", null, React.createElement(TileHolder, null)));
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
//# sourceMappingURL=compiledtypescript.js.map