
// Import react
import React, { Component, Suspense } from 'react';
import MediaQuery from 'react-responsive';

// this file pretty much just contains a whole lot of components were
// most of them are barely just wrappers for normal html elements.
// creating all these useless classes was dumb and I'm not doing it again

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
export class Title extends Component<{large ?: any, id ?: string}, any> {
    getClassName() : string {
        return `${this.props.large ? 'large' : ''}${this.props.id ? ' has-id' : ''}`;
    }
    render() {
        return (
            <h1 id={this.props.id} className={this.getClassName()}>{this.props.children}</h1>
        );
    }
}

/**
 * A header is a lesser title that should be used before subsections or as subtitles.
 */
export class Heading extends Component<{secondary ?: any}, any> {
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
 * Boldens text.
 */
export class Bold extends Component<any, any> {
    render() {
        return (
            <span className="bold">{this.props.children}</span>
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

        const comp : string = this.props.component;

        this.loadElement = React.lazy(() => import(/* webpackChunkName: "[request]" */`../dynamic/${comp}`));
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
 * Container that is hidden when the width of the browser is under a certain breakpoint.
 */
export class Hidden extends Component<{minWidth : string, className ?: string}, any> {
    render() {
        return (
            <MediaQuery query={`(min-width: ${this.props.minWidth})`}>{(matches) => <div className={this.props.className} style={{display: matches ? "inherit" : "none"}}>{this.props.children}</div>}</MediaQuery>
        );
    }
}

/**
 * A paragraph.
 */
export class Paragraph extends Component<any, any> {
    render() {
        return (
            <p>{this.props.children}</p>
        );
    }
}

/**
 * A container that is displayed floating over other elements.
 * 
 * @param isActive if the popup is visible
 * @param outerChildren children in the base of the popup, these are always visible
 * @param className additional classes for the popup container
 * @param children the items which are put inside the popup
 */
export class PopupContainer extends Component<{isActive : boolean, outerChildren ?: JSX.Element, className ?: string}, any> {
    render() {
        return (
            <div className="popup-outer-container">
                {this.props.outerChildren}
                <div className="popup-container-wrapper">
                    <div className={`popup-container${this.props.isActive ? " active" : ""}${this.props.className ? " " + this.props.className : ""}`}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Empty spacing.
 */
export class Spacing extends Component<{height : string}, any> {
    render() {
        return (
            <div style={{height: this.props.height}}></div>
        );
    }
}

/**
 * A list.
 */
export class List extends Component<any, any> {
    render() {
        return (
            <ul className="list">
               {this.props.children} 
            </ul>
        );
    }
}

/**
 * An item in a list.
 */
export class Item extends Component<any, any> {
    render() {
        return (
            <li className="list-item"><Paragraph>{this.props.children}</Paragraph></li>
        );
    }
}