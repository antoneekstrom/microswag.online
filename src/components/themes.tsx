
// React
import React, { Component, Suspense } from 'react';
import { PopupContainer } from './components';
import { LinkButton, IconButton } from './buttons';

export class ThemeSwitcher extends Component<any, {active : boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    onClick() {
        this.setState({active: !this.state.active});
    }

    render() {
        return (
            <div>
                <LinkButton onClick={() => this.onClick()}>Theme</LinkButton>
                <PopupContainer isActive={this.state.active}>
                    <ul>
                        <li><IconButton icon="pregnant_woman"/></li>
                        <li><IconButton icon="pregnant_woman"/></li>
                        <li><IconButton icon="pregnant_woman"/></li>
                    </ul>
                </PopupContainer>
            </div>
        );
    }
}