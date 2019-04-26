
import React, { Component } from 'react';
import { Button, LinkButton, IconButton } from './buttons';
import * as Components from "../components/components";
import Resources from "../content/resources";
import * as Routing from '../routing/routing';
import MediaQuery from 'react-responsive';
import { ThemeSwitcher } from './themes';

/**
 * The navigation component contains the buttons which are used navigate.
 * The NavigationComponent is used in NavigationBar which puts the buttons in a header on top of the page.
 */
export class NavigationComponent extends Component<{paths : Routing.PageMap}, {currentPage : string}> {

    buttons : JSX.Element[];

    observer : Routing.pageObserver;

    constructor(props) {
        super(props);

        this.state = {
            currentPage: Routing.getPage()
        }
    }
    

    componentWillMount() {

        let buttons = [];

        this.observer = (page) => {
            this.setState({currentPage: page});
        };
        Routing.observePage(this.observer);

        for (const path in this.props.paths) {

            let button = <NavButton currentPage={this.state.currentPage} onClick={() => Routing.setPage(path)} path={path}>{path}</NavButton>;

            buttons.push(<li key={path}>{button}</li>);
        }

        this.buttons = buttons;
    }

    componentWillUnmount() {
        Routing.unobservePage(this.observer);
    }

    render () {
        return (
            <ul>{this.buttons}</ul>
        );
    }
}

export class NavigationBar extends Component<{paths : Routing.PageMap}, {expanded : boolean}> {

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

    render() {

        // The normal navigation bar that is shown in the header
        const Bar = () => (
            <nav>
                <ThemeSwitcher/>
                <NavigationComponent paths={this.props.paths}></NavigationComponent>
            </nav>
        );

        // Displayed if the navigation buttons do not fit on the screen
        const Expand = () => (
            <div className="navigation-expand-menu">
                <IconButton className="navigation-expand-button" icon="menu" onClick={() => this.toggle()} />
                <NavigationComponent paths={this.props.paths}/>
            </div>
        );

        return (
            <div className={`navigation-bar${this.state.expanded ? " expanded" : ""}`}>

                <div className="navigation-logo">
                    <Components.Header secondary>{Resources.siteName}</Components.Header>
                </div>

                <div className={`navigation-inner${this.state.expanded ? " expanded" : ""}`}>
                    <MediaQuery query="(max-width: 550px)">
                        { (matches) => {return matches ? <Expand/> : <Bar/>;} }
                    </MediaQuery>
                </div>
            </div>
        );
    }
}

export interface Path {
    path : string;
    title : string;
}

export function path(path : string, title : string) : Path {
    return {
        path: path,
        title: title
    }
}

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