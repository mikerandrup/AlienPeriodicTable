/// <reference path="actionbase.ts" />
/// <reference path="dispatcher.ts" />
/// <reference path="actiontypes.ts" />
module SearchTiles.Actions.Filter {

    export function FilterUpdated(newValue: string) {
        var filterChangedAction = new FilterAction();
        filterChangedAction.Payload = {
            newValue: newValue
        }
        Dispatcher.dispatch(filterChangedAction);
    }

    // this is a little overkill, but I wanted to show how you could
    // combine polymorphism to guarantee an action can still be passed
    // around the event system without anything else caring, and yet the
    // contract for what the specific payload is can still be enforced
    export class FilterAction extends ActionBase {
        constructor() {
            super();
            this.ActionType = ACTION_TYPES.FILTER_CHANGED
        }
        Payload: IFilterPayload;
    }

    export interface IFilterPayload {
        newValue: string
    }

};
