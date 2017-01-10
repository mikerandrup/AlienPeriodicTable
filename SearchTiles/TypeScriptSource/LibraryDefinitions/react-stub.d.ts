interface reactInterface {
    createClass(parameters: Object): any;
    addons: any;
    Component: any;
}

declare var React: reactInterface;

interface reactDomInterface {
    render(component: any, domElementToAttach: any);
    findDOMNode(reactRef: any): HTMLElement;
}

declare var ReactDOM: reactDomInterface;
