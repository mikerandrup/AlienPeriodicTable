module SearchTiles.Stores.FakeData {

    export function StubOutElementTileData() {
        return [
            makeTile(".."),
            makeTile("Lo"),
            makeTile("ad"),
            makeTile("in"),
            makeTile("g"),
            makeTile(".."),
        ];

    }

    function makeTile(abbreviation:string):IElementModel {
        return {
            Abbreviation: abbreviation,
            Name: "Pleasewaitium",
            Identity: _identity++,
            Hue: 60
        }
    }

    // Give all of these a negative number as their key, so they will
    // transition out while the real element tiles transition in
    var _identity = -10;
}