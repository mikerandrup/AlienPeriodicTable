/// <reference path="../stores/elementtilestore.ts" />
/// <reference path="elementtile.tsx" />
module SearchTiles.Components {

    import ElementTileStore = Stores.ElementTileStore;
    import IElementModel = Stores.IElementModel;

    export var TileHolder = React.createClass({

        // has no props
        // again, there's lots of debate about whether there should
        // be a container layer that deals with all store data and actions
        // or if components should actually behave in a self sufficient way

        componentDidMount() {
            ElementTileStore.RegisterChangeHandler(
                this.handleStoreChange.bind(this)
            );
        },

        componentWillUnmount() {
            ElementTileStore.DeRegisterChangeHandler(
                this.handleStoreChange.bind(this)
            );
        },

        getInitialState() {
            return this.grabDataForState();
        },

        grabDataForState() {
            return {
                dataIsReady: ElementTileStore.getDataHasLoaded(),
                tileData: ElementTileStore.getFilteredElementCollection()
            };
        },

        handleStoreChange() {
            this.setState(
                this.grabDataForState()
            );
        },

        renderWithData() {
            const childComponents = this.state.tileData.map(
                (tile: IElementModel) => 
                    <ElementTile
                        tileData={tile}
                        key={tile.Identity}
                    />
                
            );

            return (
                <div className="tileHolder">
                    {childComponents}
                </div>
            );
        },

        renderLoadingIndicator() {
            return (
                <div className="tileHolder">
                    Like, loading the data and stuff.  Wait up for a sec.
                </div>
            );
        },

        render() {
            return this.state.dataIsReady ?
                this.renderWithData() :
                this.renderLoadingIndicator();
        }

    });

}
