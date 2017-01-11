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
    var ANIMATION_DURATION_MS = 500;

    // That being said, I'm going to offset it a little as an artistic preference
    //ANIMATION_DURATION_MS += 50;

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

        render() {
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
        }

    });

}
