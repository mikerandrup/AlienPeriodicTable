/// <reference path="storebase.ts" />
module SearchTiles.Stores {

    // This is used to namespace change events to this store only
    const NAME_OF_STORE = "MyExampleDerivedStore";

    class MyExampleDerivedStore extends StoreBase {

        constructor() {
            super(NAME_OF_STORE);
        }

    }
}
