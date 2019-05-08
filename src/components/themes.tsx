
// React
import React, { Component, Suspense } from 'react';
import * as Components from './components';
import { LinkButton, IconButton, Button } from './buttons';
import { Centered } from './containers';

/**
 * A palette contains css style properties that can be applied to the page.
 */
export interface Palette {
    highlight : string;
    backgroundPrimary : string;
    backgroundSecondary : string;
    font : string;
}

/**
 * A dark palette.
 */
export const darkPalette : Palette = {
    highlight: "rgb(255, 129, 81)",
    backgroundPrimary: "rgb(69, 69, 69)",
    backgroundSecondary: "rgb(82, 82, 82)",
    font: "white"
}

export const defaultPalette : Palette = {
    highlight: "rgb(54, 137, 247)",
    backgroundPrimary: "rgb(255, 255, 255)",
    backgroundSecondary: "rgb(243, 243, 243)",
    font: "rgb(33, 32, 62)"
}

export const pinkPalette : Palette = {
    highlight: "rgb(244, 88, 145)",
    backgroundPrimary: "rgb(255, 204, 223)",
    backgroundSecondary: "rgb(255, 221, 234)",
    font: "rgb(45, 39, 42)"
}

export const yellowPalette : Palette = {
    highlight: "rgb(42, 42, 42)",
    backgroundPrimary: "rgb(240, 200, 60)",
    backgroundSecondary: "rgb(255, 215, 84)",
    font: "rgb(42, 42, 42)"
}

/**
 * Contains the property names of a palette.
 */
export const PROPERTIES : Palette = {
    highlight: "--color-highlight",
    backgroundPrimary: "--color-background-primary",
    backgroundSecondary: "--color-background-secondary",
    font: "--color-font-primary"
}

/**
 * Themes.
 */
export const THEMES : Palette[] = [
    defaultPalette, darkPalette, pinkPalette, yellowPalette
]

/**
 * Change the colors of the page.
 * @param p the palette to use
 */
export function setPalette(p : Palette) {
    let root = document.documentElement;

    root.style.setProperty(PROPERTIES.backgroundPrimary, p.backgroundPrimary);
    root.style.setProperty(PROPERTIES.backgroundSecondary, p.backgroundSecondary);
    root.style.setProperty(PROPERTIES.highlight, p.highlight);
    root.style.setProperty(PROPERTIES.font, p.font);
}

/**
 * A button that applies a certain palette.
 */
export class PaletteButton extends Component<{palette : Palette}, any> {

    onClick() {
        setPalette(this.props.palette);
    }

    getStyle() {
        let p = this.props.palette;

        return {
            backgroundColor: p.backgroundPrimary,
            border: `solid var(--value-border) ${p.highlight}`
        };
    }

    render() {
        return (
            <Button style={this.getStyle()} className="color-palette" onClick={() => this.onClick()}/>
        );
    }
}

/**
 * A 
 */
export class ThemeSwitcher extends Component<{palettes : Palette[]}, {active : boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    onClick() {
        this.setState({active: !this.state.active});
    }

    Buttons(props : {palettes : Palette[]}) : JSX.Element {
        let buttons : JSX.Element[] = [];

        props.palettes.forEach(palette => {
            buttons.push(<PaletteButton key={palette.highlight} palette={palette} />);
        });

        return (
            <div className="theme-switcher-inner">{buttons}</div>
        );
    }

    render() {
        return (
            <div className="theme-switcher">
                <Components.PopupContainer outerChildren={<IconButton icon="color_lens" active={this.state.active} onClick={() => this.onClick()}/>} isActive={this.state.active}>
                    <ul>
                        <Components.Header>Palettes</Components.Header>
                        <this.Buttons palettes={this.props.palettes} />
                    </ul>
                </Components.PopupContainer>
            </div>
        );
    }
}