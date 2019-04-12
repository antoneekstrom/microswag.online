import React, { Component } from 'react';

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

export class Link extends Component<{onClick ?: () => void, className ?: string, active ?: any}, any> {
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