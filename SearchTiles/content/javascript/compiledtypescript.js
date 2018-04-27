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
            ACTION_TYPES[ACTION_TYPES["FILTER_CHANGED"] = 2] = "FILTER_CHANGED";
        })(Actions.ACTION_TYPES || (Actions.ACTION_TYPES = {}));
        var ACTION_TYPES = Actions.ACTION_TYPES;
        ;
    })(Actions = SearchTiles.Actions || (SearchTiles.Actions = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Utils;
    (function (Utils) {
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
    var Actions;
    (function (Actions) {
        var Filter;
        (function (Filter) {
            function FilterUpdated(newValue) {
                var filterChangedAction = new FilterAction();
                filterChangedAction.Payload = {
                    newValue: newValue
                };
                Actions.Dispatcher.dispatch(filterChangedAction);
            }
            Filter.FilterUpdated = FilterUpdated;
            var FilterAction = (function (_super) {
                __extends(FilterAction, _super);
                function FilterAction() {
                    _super.call(this);
                    this.ActionType = Actions.ACTION_TYPES.FILTER_CHANGED;
                }
                return FilterAction;
            }(Actions.ActionBase));
            Filter.FilterAction = FilterAction;
        })(Filter = Actions.Filter || (Actions.Filter = {}));
    })(Actions = SearchTiles.Actions || (SearchTiles.Actions = {}));
})(SearchTiles || (SearchTiles = {}));
;
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
            StoreBase.prototype.RegisterChangeHandler = function (changeCallback) {
                EventEmitter.on(this.StoreSpecificChangeEventName, changeCallback);
            };
            StoreBase.prototype.DeRegisterChangeHandler = function (changeCallback) {
                EventEmitter.off(this.StoreSpecificChangeEventName, changeCallback);
            };
            StoreBase.prototype.EmitChange = function () {
                EventEmitter.trigger(this.StoreSpecificChangeEventName, NULL_PAYLOAD_FOR_EVENTS);
            };
            StoreBase.prototype.HandleTheFactAnActionHappened = function (action) {
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
var SearchTiles;
(function (SearchTiles) {
    var Stores;
    (function (Stores) {
        var FakeData;
        (function (FakeData) {
            function StubOutElementTileData() {
                return [
                    makeTile(".."),
                    makeTile("Lo"),
                    makeTile("ad"),
                    makeTile("in"),
                    makeTile("g"),
                    makeTile(".."),
                ];
            }
            FakeData.StubOutElementTileData = StubOutElementTileData;
            function makeTile(abbreviation) {
                return {
                    Abbreviation: abbreviation,
                    Name: "Pleasewaitium",
                    Identity: _identity++,
                    Hue: 60
                };
            }
            var _identity = -10;
        })(FakeData = Stores.FakeData || (Stores.FakeData = {}));
    })(Stores = SearchTiles.Stores || (SearchTiles.Stores = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Stores;
    (function (Stores) {
        var ACTION_TYPES = SearchTiles.Actions.ACTION_TYPES;
        var AjaxDataGetter = SearchTiles.Utils.AjaxDataGetter;
        var StubOutElementTileData = Stores.FakeData.StubOutElementTileData;
        var NAME_OF_STORE = "ElementTileStore";
        var API_ENDPOINT = "/api/elementdata";
        var TOTALLY_FAKE_LOADING_DELAY_MS = 2500;
        var MAXIMUM_ELEMENT_TILES_AT_ONCE = 50;
        var ElementTileStoreClass = (function (_super) {
            __extends(ElementTileStoreClass, _super);
            function ElementTileStoreClass() {
                _super.call(this, NAME_OF_STORE);
            }
            ElementTileStoreClass.prototype.getDataHasLoaded = function () {
                return _dataHasLoaded;
            };
            ElementTileStoreClass.prototype.deepCopyCollection = function (collection) {
                return collection.map(function (element) {
                    return {
                        Identity: element.Identity,
                        Name: element.Name,
                        Abbreviation: element.Abbreviation,
                        Hue: element.Hue
                    };
                }).slice(0, MAXIMUM_ELEMENT_TILES_AT_ONCE);
            };
            ElementTileStoreClass.prototype.getFilteredElementCollection = function () {
                var hasFilter = _filterValue !== "";
                if (hasFilter) {
                    return this.deepCopyCollection(_tileData.filter(applyFilter));
                }
                else {
                    return this.deepCopyCollection(_tileData);
                }
            };
            ElementTileStoreClass.prototype.HandleTheFactAnActionHappened = function (action) {
                switch (action.ActionType) {
                    case ACTION_TYPES.APPLICATION_STARTED:
                        setTimeout(this.GoAskForData.bind(this), TOTALLY_FAKE_LOADING_DELAY_MS);
                        break;
                    case ACTION_TYPES.FILTER_CHANGED:
                        _filterValue = (function (action) { return action.Payload.newValue; })(action);
                        _filterValue = _filterValue.toLowerCase();
                        this.EmitChange();
                        break;
                    default:
                }
            };
            ElementTileStoreClass.prototype.GoAskForData = function () {
                AjaxDataGetter(API_ENDPOINT, this.DealWithDataThatArrived.bind(this));
            };
            ElementTileStoreClass.prototype.DealWithDataThatArrived = function (apiData) {
                _tileData = apiData;
                _dataHasLoaded = true;
                this.EmitChange();
            };
            return ElementTileStoreClass;
        }(Stores.StoreBase));
        function applyFilter(tile) {
            return tile.Name.toLowerCase().indexOf(_filterValue) > -1;
        }
        var _tileData = StubOutElementTileData();
        var _dataHasLoaded = false;
        var _filterValue = "";
        Stores.ElementTileStore = new ElementTileStoreClass();
    })(Stores = SearchTiles.Stores || (SearchTiles.Stores = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Components;
    (function (Components) {
        Components.ElementTile = React.createClass({
            render: function () {
                var tile = this.props.tileData;
                var backroundStyles = {
                    backgroundColor: "hsl(" + tile.Hue + ", 100%, 80%)"
                };
                return (React.createElement("div", {style: backroundStyles, className: "elementTile"}, React.createElement("div", {className: "elementIdentity"}, tile.Identity), React.createElement("div", {className: "elementAbbrev"}, tile.Abbreviation), React.createElement("div", {className: "elementName"}, tile.Name)));
            }
        });
    })(Components = SearchTiles.Components || (SearchTiles.Components = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Utils;
    (function (Utils) {
        function Throttle(functionToThrottle, threshholdMilliseconds, theThisContext) {
            threshholdMilliseconds || (threshholdMilliseconds = 250);
            var last, deferTimer;
            return function () {
                var context = theThisContext || this;
                var now = +new Date, args = arguments;
                if (last && now < last + threshholdMilliseconds) {
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
var SearchTiles;
(function (SearchTiles) {
    var Components;
    (function (Components) {
        var FilterUpdatedAction = SearchTiles.Actions.Filter.FilterUpdated;
        var Throttle = SearchTiles.Utils.Throttle;
        var THROTTLE_MILLISECONDS = 500;
        Components.FilterBox = React.createClass({
            componentDidMount: function () {
                this.throttledFilterAction = Throttle(FilterUpdatedAction, THROTTLE_MILLISECONDS, this);
            },
            getInitialState: function () {
                return {
                    filterValue: ""
                };
            },
            handleTextChange: function (event) {
                var updatedValue = event.target.value;
                this.setState({
                    filterValue: updatedValue
                });
                this.throttledFilterAction(updatedValue);
            },
            handleTextClear: function () {
                this.handleTextChange(makeFakeEventWithEmptyValue());
            },
            render: function () {
                return (React.createElement("div", {className: "filterHolder"}, React.createElement("input", {onChange: this.handleTextChange, value: this.state.filterValue, className: "filterInput", placeholder: "starting typing to filter elements"}), React.createElement("button", {onClick: this.handleTextClear, className: "filterClear"}, "X")));
            }
        });
        function makeFakeEventWithEmptyValue() {
            return {
                target: {
                    value: ""
                }
            };
        }
    })(Components = SearchTiles.Components || (SearchTiles.Components = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var Components;
    (function (Components) {
        var ElementTileStore = SearchTiles.Stores.ElementTileStore;
        var CSSTransitionGroup = React.addons.CSSTransitionGroup;
        var ANIMATION_CSS_CLASS_PREFIX = "spinnypop";
        var ANIMATION_DURATION_MS = 500;
        ANIMATION_DURATION_MS += 200;
        Components.TileHolder = React.createClass({
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
                    tileData: ElementTileStore.getFilteredElementCollection()
                };
            },
            handleStoreChange: function () {
                this.setState(this.grabDataForState());
            },
            render: function () {
                var childTileComponents = this.state.tileData.map(function (tile) {
                    return React.createElement(Components.ElementTile, {tileData: tile, key: tile.Identity});
                });
                return (React.createElement("div", {className: "tileHolder"}, React.createElement(CSSTransitionGroup, {style: {}, transitionName: ANIMATION_CSS_CLASS_PREFIX, transitionEnter: true, transitionLeave: true, transitionEnterTimeout: ANIMATION_DURATION_MS, transitionLeaveTimeout: ANIMATION_DURATION_MS}, childTileComponents)));
            }
        });
    })(Components = SearchTiles.Components || (SearchTiles.Components = {}));
})(SearchTiles || (SearchTiles = {}));
var SearchTiles;
(function (SearchTiles) {
    var RegisterDOMReadyFunction = SearchTiles.Utils.AppStart.RegisterDomReadyFunction;
    var TriggerApplicationStartedAction = SearchTiles.Actions.Lifecycle.ApplicationStarted;
    var TileHolder = SearchTiles.Components.TileHolder;
    var FilterBox = SearchTiles.Components.FilterBox;
    var Application = React.createClass({
        render: function () {
            return (React.createElement("div", null, React.createElement(FilterBox, null), React.createElement(TileHolder, null)));
        }
    });
    function InitializeApplication() {
        ReactDOM.render(React.createElement(Application, null), document.getElementById('application'));
        TriggerApplicationStartedAction();
    }
    RegisterDOMReadyFunction(InitializeApplication);
})(SearchTiles || (SearchTiles = {}));
//# sourceMappingURL=compiledtypescript.js.map
