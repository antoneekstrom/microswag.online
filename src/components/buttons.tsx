import React, { Component } from 'react';
import { Centered } from './containers';

// different kinds of buttons


/**
 * A button.
 * 
 * @param active if the button is active. When the button is active it has another class "active"
 */
export class Button extends Component<{onClick ?: () => void, className ?: string, active ?: any, style ?: React.CSSProperties}, any> {
    
    onClick() {
        if (this.props.onClick) this.props.onClick();
    }

    render() {
        return (
            <button style={this.props.style} onClick={() => this.onClick()} className={`button${this.props.active ? " active" : ""} ${this.props.className || ""}`}>{this.props.children}</button>
        );
    }
}

/**
 * A button that displays a material icon.
 * 
 * @param icon the name of the icon
 */
export class IconButton extends Component<{icon : string, onClick ?: () => void, className ?: string, active ?: boolean}, any> {
    render() {
        return (
            <Centered className={this.props.className}>
                <i onClick={this.props.onClick} className={`material-icons${this.props.active ? " active" : ""}`}>{this.props.icon}</i>
            </Centered>
        );
    }
}

/**
 * A button, but with a class "link". Unnecessary? Yes. What was I thinking? Not sure.
 */
export class LinkButton extends Component<{onClick ?: () => void, className ?: string, active ?: any}, any> {
    onClick() {
        if (this.props.onClick)
        this.props.onClick();
    }
    render() {
        return (
            <Button active={this.props.active} onClick={() => this.onClick()} className={`link ${this.props.className || ""}`}>{this.props.children}</Button>
        );
    }
}

/**
 * An anchor link.
 */
export class Link extends Component<{href : string, target ?: string, className ?: string}, any> {
    render() {
        return (
            <a target={this.props.target || '_blank'} className={`link ${this.props.className}`} href={this.props.href}>{this.props.children}</a>
        );
    }
}

/**
 * An anchor that takes you to an element with an id.
 */
export class AnchorButton extends Component<{id : string}, any> {
    render() {
        return (
            <Link className="button active" target="_self" href={`#${this.props.id}`}>{this.props.children}</Link>
        );
    }
}