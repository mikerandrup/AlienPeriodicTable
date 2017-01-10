/// <reference path="actionbase.ts" />
/// <reference path="../util/eventemitter.ts" />
module SearchTiles.Actions {

    import EventEmitter = Utils.EventEmitter;

    const NAME_FOR_ALL_ACTION_EVENTS = "ACTION";
    export var Dispatcher = {

        subscribeToActions(actionHandler: Function) {
            EventEmitter.on(
                NAME_FOR_ALL_ACTION_EVENTS,
                actionHandler
            );
        },

        unsubscribeFromActions(actionHandler: Function) {
            EventEmitter.off(
                NAME_FOR_ALL_ACTION_EVENTS,
                actionHandler
            );
        },

        dispatch(actionToDispatch: ActionBase) {

            console.log("Action Happened: " + actionToDispatch.Name);

            EventEmitter.trigger(
                NAME_FOR_ALL_ACTION_EVENTS,
                actionToDispatch
            );
        }

    }
}
