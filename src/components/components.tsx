
// Import react
import React, { Component } from 'react';

export class Loading extends Component<any, any> {
    render () {
        return (
            <div>loading...</div>
        );
    }
}

export class Title extends Component<any, any> {
    render () {
        return (
            <h1>{this.props.children}</h1>
        );
    }
}

export class Header extends Component<any, any> {
    render () {
        return (
            <h2>{this.props.children}</h2>
        );
    }
}

import { Button } from "./buttons";
import { NavigationBar } from "./navigation";
export { Button, NavigationBar };