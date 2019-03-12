
// Import react
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

// Import site-wide components
import * as Components from "../components/components";
import { createComponentPath, createDynamicComponent, ComponentPath, Loader, createLoaderElement } from '../loading/loader';
import { Page, Content } from '../components/containers';

// A component that is loaded dynamically as it is rendered.
let loadElement = createLoaderElement(() => import(/* webpackChunkName: "component" */`../components/image`), <Components.Loading/>);

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
            <Page>
                <Components.NavigationBar/>
                <Content>
                    <Components.Title large>Microswag.online</Components.Title>

                    <Components.Header>
                        Du befinner dig vid det här tillfället på en webbplats som kallas för <Components.Highlight>microswag.online</Components.Highlight> och det kan vara det bästa som har hänt dig sedan du var nära på att bli överkörd den där gången du vet.
                    </Components.Header>

                    <div>
                        <Components.Button onClick={() => this.setState({test: true})}>load component</Components.Button>
                        { this.state.test ? loadElement : <h2>not loaded (epic)</h2> }
                    </div>
                </Content>
            </Page>
        );
    }
}

// Render the application component onto the site
ReactDOM.render(<Application/>, document.getElementById("root"));