/// <reference path="actionbase.ts" />
/// <reference path="dispatcher.ts" />
/// <reference path="actionnames.ts" />
module SearchTiles.Actions.Lifecyle {

    export function ApplicationStarted() {

        var appStartedAction = new ActionBase();
        appStartedAction.Name = ACTION_NAMES.APPLICATION_STARTED;
        Dispatcher.dispatch(appStartedAction); 
    }

};
