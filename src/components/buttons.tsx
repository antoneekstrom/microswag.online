import React, { Component } from 'react';
import { Centered } from './containers';

export class Button extends Component<{onClick ?: () => void, className ?: string, active ?: any}, any> {
    
    onClick() {
        if (this.props.onClick) this.props.onClick();
    }

    render() {
        return (
            <button onClick={() => this.onClick()} className={`button${this.props.active ? " active" : ""} ${this.props.className || ""}`}>{this.props.children}</button>
        );
    }
}

export class IconButton extends Component<{icon : string, onClick ?: () => void, className ?: string}, any> {
    render() {
        return (
            <Centered className={this.props.className}>
                <i onClick={this.props.onClick} className="material-icons">{this.props.icon}</i>
            </Centered>
        );
    }
}

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