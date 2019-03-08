
// Import react
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

// Plugin used for dynamically loading in react components
// This improves initial load times cause the loading can be split up and done asynchronously
// Components won't be loaded if they aren't being used
import * as Loadable from 'react-loadable';

// A component that is loaded dynamically as it is rendered.
const LoadableTest = Loadable({
    loader: () => import(/* webpackChunkName: "components" */'../components/components'),
    loading() {
      return <div>Loading...</div>
    }
});

/**
 * Application is the main component of the site. In this component, everything else will be rendered.
 * The app component will be rendered into the 'root' container in the html document.
 */
class Application extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            test: false
        };
    }
    
    render() {
        return (
            <div>
                <button onClick={() => this.setState({test: true})}>load component</button>
                { this.state.test ? <LoadableTest/> : <h2>epic</h2> }
            </div>
        );
    }
}

// Render the application component onto the site
ReactDOM.render(<Application/>, document.getElementById("root"));