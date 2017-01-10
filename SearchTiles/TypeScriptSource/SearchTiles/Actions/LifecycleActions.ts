/// <reference path="actionbase.ts" />
/// <reference path="dispatcher.ts" />
/// <reference path="actiontypes.ts" />
module SearchTiles.Actions.Lifecycle {

    export function ApplicationStarted() {
        var appStartedAction = new ActionBase();
        appStartedAction.ActionType = ACTION_TYPES.APPLICATION_STARTED;
        Dispatcher.dispatch(appStartedAction); 
    }

};
