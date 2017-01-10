module SearchTiles.Actions {

    export class ActionBase {

        constructor() {
            this.Payload = {};
        }

        ActionType: ACTION_TYPES;
        Payload: any;
    }
}
