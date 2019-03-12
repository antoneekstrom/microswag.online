
// Import react
import React, { Component } from 'react';

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
export class Header extends Component<any, any> {
    render() {
        return (
            <h2>{this.props.children}</h2>
        );
    }
}

export class Highlight extends Component<any, any> {
    render() {
        return (
            <span className="highlight">{this.props.children}</span>
        );
    }
}

import { Button } from "./buttons";
import { NavigationBar } from "./navigation";
export { Button, NavigationBar };