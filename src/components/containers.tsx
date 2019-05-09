import React, { Component } from 'react';

/**
 * The outermost container.
 */
export class Page extends Component<{page ?: JSX.Element}, any> {
    render () {
        return (
            <div className="page">{this.props.page || this.props.children}</div>
        );
    }
}

/**
 * 
 */
export class Main extends Component<any, any> {
    render () {
        return (
            <main>{this.props.children}</main>
        );
    }
}

export class Content extends Component<any, any> {
    render() {
        return (
            <div className="centered">
                <div className="content">{this.props.children}</div>
            </div>
        );
    }
}

export class Centered extends Component<{align ?: any, justify ?: any, direction ?: any, className ?: string, style ?: React.CSSProperties}, any> {

    getStyle() {
        return {
            display: "flex",
            alignItems: this.props.align ? this.props.align : "center",
            justifyContent: this.props.justify ? this.props.justify : "center",
            flexDirection: this.props.direction ? this.props.direction : "column",
            ...this.props.style
        };
    }
    
    render() {
        return (
            <div className={this.props.className} style={this.getStyle()}>{this.props.children}</div>
        );
    }
}