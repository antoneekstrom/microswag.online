
// Import react
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

// Import site-wide components
import { Page, Main, Content } from '../components/containers';

import * as Routing from "../routing/routing";
import { HomePage, OtherPage } from '../content/pages';


export const pages : Routing.PageMap = {
    "home": <HomePage/>,
    "boule": <OtherPage/>
}

/**
 * Application is the main component of the site. In this component, everything else will be rendered.
 * The app component will be rendered into the 'root' container in the html document.
 */
class Application extends Component<any, {page : JSX.Element}> {

    pages : Routing.PageMap;

    router : Routing.Router;

    constructor(props) {
        super(props);

        this.pages = pages;

        this.state = {
            page: this.pages.home
        };
    }

    componentWillMount() {
        this.router = new Routing.Router(this.pages, (page) => this.setState({page: page}), "home");
    }

    render() {
        return <Page page={this.state.page} />;
    }
}

// Render the application component onto the site
ReactDOM.render(<Application/>, document.getElementById("root"));