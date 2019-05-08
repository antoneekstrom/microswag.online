
// Import react
import React, { Component, Suspense } from 'react';
import MediaQuery from 'react-responsive';

/**
 * An element that is shown in place of content that has not been loaded yet.
 */
export class Loading extends Component<any, any> {
    render() {
        return (
            <div className="loading-container">
                <h3 className="loading-text">loading...</h3>
            </div>
        );
    }
}

/**
 * A large h1 element that is used for the main title of the current content on the page.
 */
export class Title extends Component<{large ?: any}, any> {
    getClassName() : string {
        return this.props.large ? 'large' : '';
    }
    render() {
        return (
            <h1 className={this.getClassName()}>{this.props.children}</h1>
        );
    }
}

/**
 * A header is a lesser title that should be used before subsections or as subtitles.
 */
export class Header extends Component<{secondary ?: any}, any> {
    render() {
        return (
            <h2 className={this.props.secondary ? "secondary" : ""}>{this.props.children}</h2>
        );
    }
}

/**
 * Highlight a word in text to bring more attention to it.
 */
export class Highlight extends Component<any, any> {
    render() {
        return (
            <span className="highlight">{this.props.children}</span>
        );
    }
}

/**
 * This is a sort of wrapper element for using the dynamic import functionality.
 * 
 * @arg component the path to the component
 * @arg loadingComponent an element that is displayed while the other content is loaded.
 */
export class LoadContainer extends Component<{component : string, loadingComponent : JSX.Element}, any> {

    loadElement : React.LazyExoticComponent<any>;

    constructor(props) {
        super(props);

        const comp : string = `${this.props.component}`;

        this.loadElement = React.lazy(() => import(/* webpackChunkName: "[request]" */`../components/dynamic/${comp}`));
    }
    
    render() {
        return (
            <Suspense fallback={this.props.loadingComponent}>
                <this.loadElement/>
            </Suspense>
        );
    }
}

/**
 * Should be used to contain Card components.
 */
export class CardContainer extends Component<any, any> {
    render() {
        return (
            <MediaQuery query="(max-width: 550px)">
            {
                (matches) => {
                    return (
                        <Centered justify="space-evenly" align="center" direction={matches ? "column" : "row"} className="card-container">
                            {this.props.children}
                        </Centered>
                    );
                }
            }
            </MediaQuery>
        );
    }
}

/**
 * A card that is meant to display additional information.
 * This information should not be important and should be hidden when it does not fit.
 */
export class Card extends Component<any, any> {
    render() {
        return (
            <Hidden className="card" minWidth={NAV_WIDTH_BREAKPOINT}>{this.props.children}</Hidden>
        );
    }
}

/**
 * Float text to the left so that it can be next to additional content like cards which are floated to the right.
 */
export class FloatLeft extends Component<any, any> {
    render() {
        return (
            <div style={{float: "left"}}>{this.props.children}</div>
        );
    }
}

/**
 * Container that is hidden when the width of the browser is under a certain breakpoint.
 */
export class Hidden extends Component<{minWidth : string, className ?: string}, any> {
    render() {
        return (
            <MediaQuery query={`(min-width: ${this.props.minWidth})`}>{(matches) => <div className={this.props.className} style={{display: matches ? "inherit" : "none"}}>{this.props.children}</div>}</MediaQuery>
        );
    }
}

export class Paragraph extends Component<any, any> {
    render() {
        return (
            <p>{this.props.children}</p>
        );
    }
}

export class PopupContainer extends Component<{isActive : boolean, outerChildren ?: JSX.Element, className ?: string}, any> {
    render() {
        return (
            <div className="popup-outer-container">
                {this.props.outerChildren}
                <div className={`popup-container${this.props.isActive ? " active" : ""}${this.props.className ? " " + this.props.className : ""}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

import { NavigationComponent, NAV_WIDTH_BREAKPOINT } from "./navigation";
import { Centered } from './containers';