/// <reference path="../actions/actionbase.ts" />
/// <reference path="../actions/dispatcher.ts" />
/// <reference path="../Utils/eventemitter.ts" /> 

module SearchTiles.Stores {

    import EventEmitter = Utils.EventEmitter;
    import Dispatcher = Actions.Dispatcher;
    import ActionBase = Actions.ActionBase;

    const BASE_NAME_OF_CHANGE_EVENTS = "CHANGE-";
    const NULL_PAYLOAD_FOR_EVENTS = {};

    export class StoreBase {

        constructor(nameOfDerivedStore: string) {
            this.StoreSpecificChangeEventName = BASE_NAME_OF_CHANGE_EVENTS + nameOfDerivedStore;

            Dispatcher.subscribeToActions(
                this.HandleTheFactAnActionHappened.bind(this)
            );
        }

        // Since we use a super-simple singleton event system, namespace the change events per store
        StoreSpecificChangeEventName: string;

        // Components will use this to be notified of data updates
        RegisterChangeHandler(changeCallback: Function) {
            EventEmitter.on(
                this.StoreSpecificChangeEventName,
                changeCallback
            );
        }

        // When a component is about to go away, it should call this
        DeRegisterChangeHandler(changeCallback: Function) {
            EventEmitter.off(
                this.StoreSpecificChangeEventName,
                changeCallback
            );
        }

        // Derived stores call this to tell components something has changed
        EmitChange() {
            EventEmitter.trigger(
                this.StoreSpecificChangeEventName,
                NULL_PAYLOAD_FOR_EVENTS
            );
        }

        // Allows store to know about actions in the app
        HandleTheFactAnActionHappened(action: ActionBase) {
            // by default, do nothing.
            // override in derived stores as needed
        }

    }
}
