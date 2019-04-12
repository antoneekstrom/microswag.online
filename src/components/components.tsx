
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
                    return <Centered justify="space-evenly" align="center" direction={matches ? "column" : "row"} className="card-container">
                        {this.props.children}
                    </Centered>
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
export class Card extends Component<{title : string}, any> {
    render() {
        return (
            <div className="card">
                <h2>{this.props.title}</h2>
                <h3>{this.props.children}</h3>
            </div>
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

import { Button } from "./buttons";
import { NavigationComponent } from "./navigation";
import { Centered } from './containers';

export { Button };