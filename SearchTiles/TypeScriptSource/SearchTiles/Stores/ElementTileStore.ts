/// <reference path="storebase.ts" />
/// <reference path="../utils/ajax.ts" />
/// <reference path="../actions/actionbase.ts" />
/// <reference path="../actions/actiontypes.ts" />
module SearchTiles.Stores {

    import ActionBase = Actions.ActionBase;
    import ACTION_TYPES = Actions.ACTION_TYPES;
    import AjaxDataGetter = Utils.AjaxDataGetter;

    const API_ENDPOINT = "/api/elementdata";

    class ElementTileStoreClass extends StoreBase {

        constructor() {
            super();
        }

        // For namespacing the emitting of changes
        NameOfStore = "ElementTileStore";

        getDataHasLoaded() {
            return _dataHasLoaded;
        }
 
        // deep copy so we don't pass around a mutable reference
        // to our single source of truth.  there are definite
        // performance penalties to doing this everywhere, so use your judgement
        getElementCollection() {
            return _tileData.map(
                (element: IElementModel):IElementModel => {
                    return {
                        Identity: element.Identity,
                        Name: element.Name,
                        Abbreviation: element.Abbreviation,
                        Hue: element.Hue
                    }
                }
            );
        }

        HandleTheFactAnActionHappened(action: ActionBase) {
            switch (action.ActionType) {
                case ACTION_TYPES.APPLICATION_STARTED:
                    this.GoAskForData();
                    break;

                default:
                    // do nothing;
            }
        }

        // There are many patterns for this!  For simplicity, I'm
        // having the store go get the data and deal with it directly
        // Promises would have been nice here, but I'm keeping it simple
        GoAskForData() {
            AjaxDataGetter(
                API_ENDPOINT,
                this.DealWithDataThatArrived.bind(this)
            );
        }

        DealWithDataThatArrived(apiData) {
            // there's no transformation we need to do except for an explicit type cast
            _tileData = <IElementModel[]>apiData;

            _dataHasLoaded = true;

            this.EmitChange();
        }
    }

    // I'm hiding the store's private data here in the outer closure.
    // (Of course this means we had better not instantiate two stores)

    // I like to stub everything out so the components have runtime protection
    var _tileData: IElementModel[] = [];

    var _dataHasLoaded = false;

    // The beauty of TypeScript is the concept of having a model (imagine that!).
    // check out http://type.litesolutions.net/ for having the C#
    // automatically keep these contracts in sync over time

    // what we expect from the server
    export interface IElementModel {
        Identity: number;
        Name: string;
        Abbreviation: string;
        Hue: number;
    }

    // we export the actual constructed instance of the store
    export var ElementTileStore = new ElementTileStoreClass();

}