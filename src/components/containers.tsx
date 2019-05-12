import React, { Component } from 'react';

// mostly just wrappers for different kinds of containers

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
 * The main container for the content of the site.
 */
export class Main extends Component<any, any> {
    render () {
        return (
            <main>{this.props.children}</main>
        );
    }
}

/**
 * Is meant to house the text content.
 * This container puts padding on the sides and makes reading the text more nice,
 * mostly because there is not enough text content and it looks empty if the text
 * covers the entire width.
 */
export class Content extends Component<any, any> {
    render() {
        return (
            <div className="centered">
                <div className="content">{this.props.children}</div>
            </div>
        );
    }
}

/**
 * A flex-box container.
 */
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

export const GRID_RIGHT = "right", GRID_LEFT = "left", GRID_TOP = "top", GRID_BOTTOM = "bottom";

/**
 * A container that aligns items using grid-layout.
 */
export class GridContainer extends Component<any, any> {

    render() {
        return (
            <div style={{
                display: "grid",
                gridTemplateRows: 'auto',
                gridTemplateColumns: 'auto auto',
                gridTemplateAreas: `"${GRID_LEFT} ${GRID_RIGHT}"`
            }} className="grid-container">{this.props.children}</div>
        );
    }
}

export class GridItem extends Component<{area : string}, any> {
    render() {
        return (
            <div className="grid-item" style={{
                gridArea: this.props.area
            }}>{this.props.children}</div>
        );
    }
}