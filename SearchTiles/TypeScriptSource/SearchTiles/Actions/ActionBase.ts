module SearchTiles.Actions {

    export class ActionBase {

        constructor() {
            this.Payload = {};
        }

        Name: ACTION_NAMES;
        Payload: any;
    }
}
