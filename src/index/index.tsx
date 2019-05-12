
// Import react
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import { Page } from '../components/containers';

import * as Routing from "../routing/routing";
import { NavigationBar, NavigationComponent } from '../components/navigation';
import { THEMES, ThemeSwitcher } from '../components/themes';
import { Footer } from '../content/content';

import { CatHomePage, CatSecondPage } from '../content/pages';


// this file is the entrypoint of the webapplication


/**
 * Application is the main component of the site. In this component, everything else will be rendered.
 * The app component will be rendered into the 'root' container in the html document.
 * 
 * The Page is mostly a wrapper for what is inside and the actual content is stored in
 * the state variable "page", changing the page state is like navigating to another page on the site.
 * 
 * The navigational logic of the site is the same "router" component that I created for my previous site.
 * It still has some bugs. For example, the back and forth arrows of the browser doesnot work to navigate away
 * from the page once one has arrived to it. This is a large flaw, but it can also be seen as a feature.
 */
class Application extends Component<any, {page : JSX.Element}> {

    // the pages
    pages : Routing.PageMap;

    // the "router"
    // is responsible for changing page and URL and all that
    router : Routing.Router;

    constructor(props) {
        super(props);

        // the components which are associated with a certain url parameter
        // these are the different pages of the site
        this.pages = {
            "Hem": <CatHomePage/>,
            "Katter": <CatSecondPage/>
        };

        this.state = {
            page: undefined
        };
    }

    componentWillMount() {
        // setting up the router
        // first argument are the pages
        // second argument is a function that receives the page when it is to be shown
        // this function sets the "state" of the application to the new page, this rerenders the site
        // with the new elements
        // third argument: "Hem" is the fallback route in case a route is not specified or invalid
        this.router = new Routing.Router(this.pages, (page) => this.setState({page: page}), "Hem");
        Routing.setPage(Routing.getPage());
    }

    render() {
        return (
            <div>
                <NavigationBar>
                    <ThemeSwitcher palettes={THEMES}>Teman</ThemeSwitcher>
                    <NavigationComponent paths={this.pages}/>
                </NavigationBar>
                <Page page={this.state.page} />
                <Footer/>
            </div>
        );
    }
}

// Render the application component onto the site
ReactDOM.render(<Application/>, document.getElementById("root"));