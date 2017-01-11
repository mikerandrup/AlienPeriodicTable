/// <reference path="../actions/filteractions.ts" />
/// <reference path="../utils/throttle.ts" />
/// <reference path="../stores/elementtilestore.ts" />
/// <reference path="elementtile.tsx" />
module SearchTiles.Components {

    import FilterUpdatedAction = Actions.Filter.FilterUpdated;
    import Throttle = Utils.Throttle;

    // I'm thinking this will end up being deliberately high
    // probably to time with the CSS animation duration
    // (I suspect this will create a desirable effect)
    const THROTTLE_MILLISECONDS = 500;

    export var FilterBox = React.createClass({

        componentDidMount() {

            // We use the Throttle utility as a factory to produce a callback
            // that won't fire incessantly while the user types in the input box
            this.throttledFilterAction = Throttle(
                FilterUpdatedAction,
                THROTTLE_MILLISECONDS,
                this
            );
        },

        getInitialState() {
            return {
                filterValue: ""
            };
        },

        // inputs are funny in react.  You are actually responsible for updating
        // the text value as typing happens, and rapidly re-rendering it
        handleTextChange(event) {

            const updatedValue = event.target.value

            // this triggers a re-render with the new input value
            this.setState({
                filterValue: updatedValue
            });

            // fire the action with updated filter value in a throttled way
            this.throttledFilterAction(updatedValue);
        },

        handleTextClear() {
            this.handleTextChange(
                makeFakeEventWithEmptyValue()
            );
        },

        render() {
            return (
                <div className="filterHolder">
                    <input
                        onChange={this.handleTextChange}
                        value={this.state.filterValue}
                        className="filterInput"
                        placeholder="type to filter elements"
                        />
                    <button
                        onClick={this.handleTextClear}
                        className="filterClear"
                    >
                        X
                    </button>
                </div>
            );
        }

    });

    // I don't love this, but it does work
    function makeFakeEventWithEmptyValue() {
        return {
            target: {
                value: ""
            }
        };
    }

}
