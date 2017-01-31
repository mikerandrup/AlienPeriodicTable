/// <reference path="Utils/appstart.ts" />
/// <reference path="../librarydefinitions/react-stub.d.ts" />
module SearchTiles {

    import RegisterDOMReadyFunction = Utils.AppStart.RegisterDomReadyFunction;

    var Application = React.createClass({

        render: function () {
            return (
                <div>
                    React is working, and has mounted the "Root Component".
                </div>
            );
        }

    });

    // This root application component gets to reach into the DOM.
    // Such things won't typically happen anywhere else.
    function InitializeApplication() {

        // Feel free to get rid of this thing immediately after seeing it work.
        alert("TypeScript is working, and the compiled javascript has loaded on the page.");

        // This tells ReactDOM to mount the root component in the DOM
        ReactDOM.render(
            <Application />,
            document.getElementById('application')
        );

        // TODO: Define Application LifeCycle actions and trigger one here
        //  - This kicks off everything going on in the Flux pattern

    }

    // This binds our startup to the DOM being ready
    RegisterDOMReadyFunction(InitializeApplication);

}