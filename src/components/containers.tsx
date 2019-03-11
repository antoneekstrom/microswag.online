import React, { Component } from 'react';

/**
 * The outermost container.
 */
export class Page extends Component<any, any> {
    render () {
        return (
            <div className="page">{this.props.children}</div>
        );
    }
}

/**
 * 
 */
export class Content extends Component<any, any> {
    render () {
        return (
            <div className="centered">
                <main>{this.props.children}</main>
            </div>
        );
    }
}