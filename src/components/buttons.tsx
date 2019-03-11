import React, { Component } from 'react';

export class Button extends Component<{onClick ?: () => void}, any> {
    
    onClick() {
        this.props.onClick();
    }

    render() {
        return (
            <button onClick={() => this.onClick()} className="button">{this.props.children}</button>
        );
    }
}

export class Container extends Component<any, any> {
    render () {
        return (
            <div>epic</div>
        );
    }
}