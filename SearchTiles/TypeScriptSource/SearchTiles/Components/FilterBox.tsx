/// <reference path="../stores/elementtilestore.ts" />
/// <reference path="elementtile.tsx" />
module SearchTiles.Components {

    export var FilterBox = React.createClass({

        getInitialState() {
            return {
                filterValue: ""
            };
        },

        // inputs are funny in react.  You are actually responsible for updating
        // the text value as typing happens, and rapidly re-rendering it
        handleTextChange(event) {
            this.setState({
                filterValue: event.target.value
            });
            // fire the action with updated filter value in a throttled way
        },

        // I don't love this, but it does work
        handleTextClear() {
            this.handleTextChange(
                {
                    target: {
                        value: ""
                    }
                }
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

}
