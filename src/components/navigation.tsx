
import React, { Component } from 'react';
import { LinkButton, IconButton } from './buttons';
import * as Routing from '../routing/routing';
import MediaQuery from 'react-responsive';
import { Heading } from './components';

// widths and values for responsive components
export const NAV_WIDTH_BREAKPOINT = "620px";
export const CONTENT_WIDTH_BREAKPOINT = "790px";
const DEFAULT_NAV_HEIGHT = "3em";

// this file holds the navigational components of the website.

/**
 * The navigation component contains the buttons which are used navigate.
 * The NavigationComponent is used in NavigationBar which puts the buttons in a header on top of the page.
 */
export class NavigationComponent extends Component<{paths : Routing.PageMap}, {currentPage : string}> {

    /**
     * The navigation buttons
     */
    buttons : JSX.Element[];

    /**
     * This observer receives a notification when the page URL parameter is changed
     */
    observer : Routing.pageObserver;

    constructor(props) {
        super(props);

        this.state = {
            currentPage: Routing.getPage()
        }
    }
    
    switchPage(path : string) : void {
        Routing.setPage(path);
        window.scrollTo(0, 0);
    }

    componentWillMount() {

        let buttons = [];

        this.observer = (page) => {
            this.setState({currentPage: page});
        };
        Routing.observePage(this.observer);

        // create a button for each page
        for (const path in this.props.paths) {

            let button = <NavButton currentPage={this.state.currentPage} onClick={() => this.switchPage(path)} path={path}>{path}</NavButton>;

            buttons.push(<li key={path}>{button}</li>);
        }

        this.buttons = buttons;
    }

    componentWillUnmount() {
        // unregister from the observer
        Routing.unobservePage(this.observer);
    }

    render () {
        return (
            <ul>{this.buttons}</ul>
        );
    }
}

/**
 * The navigation bar. This component (among others) is kind of a mess.
 * @param expanded if the bar is currently expanded
 */
export class NavigationBar extends Component<any, {expanded : boolean}> {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    toggle() : void {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    getStyle(expanded : boolean) {

        let e = document.querySelector<HTMLElement>(".navigation-expand-menu");
        let height;

        if (e) {
            let h = e.offsetHeight;
            height = `${h}px`;
        }
        else {
            height = DEFAULT_NAV_HEIGHT;
        }

        return {
            height: expanded ? height : DEFAULT_NAV_HEIGHT
        }
    }

    render() {

        // I create two functional components
        // one for mobile and on for desktop
        // depending on the width of the browser I display one of them

        // The normal navigation bar that is shown in the header
        const Bar = () => {
            return (
                <nav className="navigation-menu">
                    {this.props.children}
                </nav>
            );
        };

        // Displayed if the navigation buttons do not fit on the screen
        const Expand = () => (
            <nav className="navigation-expand-menu">
                <IconButton className="navigation-expand-button" icon="menu" onClick={() => this.toggle()} />
                {this.props.children}
            </nav>
        );

        // the MediaQuery component is from a plugin that can send mediaqueries from React 
        // the component takes in a function which receives a boolean signaling if the query is true or false
        // depending on this you can return different components.
        return (
            <MediaQuery query={`(max-width: ${NAV_WIDTH_BREAKPOINT})`}>
                {
                    (matches) => {
                        let expanded = this.state.expanded && matches;

                        return (
                            <div className="navigation-bar-outer">
                                <div style={this.getStyle(expanded)} className={`navigation-bar${expanded ? " expanded" : ""}`}>
                                    <div className="navigation-logo">
                                        <Heading secondary>microswag.online</Heading>
                                    </div>
    
                                    <div className={`navigation-inner${expanded ? " expanded" : ""}`}>
                                        {matches ? <Expand/> : <Bar/>}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            </MediaQuery>
        );
    }
}

/**
 * A path consists of the route and the name of that page.
 */
export interface Path {
    path : string;
    title : string;
}

/**
 * Creates a path object.
 * @param path the path/route
 * @param title the title of the page
 */
export function path(path : string, title : string) : Path {
    return {
        path: path,
        title: title
    }
}

/**
 * A button that changes appearance depending on if the path matches the current page.
 */
class NavButton extends Component<{path : string, onClick ?: () => void, currentPage ?: string}, any> {

    onClick() {
        if (this.props.onClick) this.props.onClick();
    }

    isActive() {
        const active = this.props.currentPage == this.props.path;
        return active ? active : undefined;
    }

    render() {
        return (
            <LinkButton active={this.isActive()} className={`navigation`} onClick={() => this.onClick()} >{this.props.children}</LinkButton>
        );
    }
}