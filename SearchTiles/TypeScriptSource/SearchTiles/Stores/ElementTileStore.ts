/// <reference path="storebase.ts" />
/// <reference path="../utils/ajax.ts" />
/// <reference path="../actions/actionbase.ts" />
/// <reference path="../actions/actiontypes.ts" />
module SearchTiles.Stores {

    import ActionBase = Actions.ActionBase;
    import FilterAction = Actions.Filter.FilterAction;
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
        deepCopyCollection(collection: IElementModel[]) {
            return collection.map(
                (element: IElementModel): IElementModel => {
                    return {
                        Identity: element.Identity,
                        Name: element.Name,
                        Abbreviation: element.Abbreviation,
                        Hue: element.Hue
                    }
                }
            );
        }

        getFilteredElementCollection() {

            const hasFilter = _filterValue !== "";

            if (hasFilter) {
                return this.deepCopyCollection(
                    _tileData.filter(
                        applyFilter
                    )
                );
            }
            else {
                return this.deepCopyCollection(_tileData);
            }
        }

        HandleTheFactAnActionHappened(action: ActionBase) {
            switch (action.ActionType) {
                case ACTION_TYPES.APPLICATION_STARTED:
                    this.GoAskForData();
                    break;

                case ACTION_TYPES.FILTER_CHANGED:
                    // Okay, yeah so this is really weird.  I'm using a lamba as a way to type cast
                    // the action (and know the payload signature) without having to create
                    // a new variable that would pollute the scope of this switch statement
                    // Probably you don't want to do stuff like this in real life
                    _filterValue = ((action: FilterAction) => action.Payload.newValue)(<FilterAction>action);
                    _filterValue = _filterValue.toLowerCase();
                    this.EmitChange();
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

            // tell any listening components we've updated *something* 
            this.EmitChange();
        }
    }

    function applyFilter(tile: IElementModel) {
        return tile.Name.toLowerCase().indexOf(_filterValue) > -1;
    }

    // I'm hiding the store's private data here in the outer closure.
    // (Of course this means we had better not instantiate two stores)

    // I like to stub everything out so the components have runtime protection
    var _tileData: IElementModel[] = [];

    var _dataHasLoaded = false;

    // the sub-string we require to be present to include filtered elements
    var _filterValue = "";

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