/// <reference path="../stores/elementtilestore.ts" />
/// <reference path="elementtile.tsx" />
module SearchTiles.Components {

    import ElementTileStore = Stores.ElementTileStore;
    import IElementModel = Stores.IElementModel;

    // Provided directly by the React library itself
    var CSSTransitionGroup = React.addons.CSSTransitionGroup;

    // This needs to match the animation duration in the style sheet.
    // The CSSTransitionGroup does some cool stuff behind the scenes
    // in terms of ripping stuff out of the DOM when the exit animation has finished.
    const ANIMATION_DURATION_MS = 500;

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
                    <CSSTransitionGroup
                        style={{}}
                        transitionName="spinnypop"
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={ANIMATION_DURATION_MS}
                        transitionLeaveTimeout={ANIMATION_DURATION_MS}
                    >
                        {childComponents}
                    </CSSTransitionGroup>
                </div>
            );
        },

        // This is actually pretty unnecessary.  Because we stubbed out
        // an empty collection in the store that's available before
        // data loads, this component can step over the empty collection
        // and result in a no-op, which is actually valid and fine.
        // Even better would be to stub out element tiles that spelled
        // out the word "Loading" lol.  Totally doing that.
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
