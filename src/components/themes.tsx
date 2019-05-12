
// React
import React, { Component } from 'react';
import { IconButton, Button } from './buttons';
import { PopupContainer, Heading } from './components';

// palettes are color presets for the website
// when applying a palette you are changing CSS variables which affect the whole site

/**
 * A palette contains css style properties that can be applied to the page.
 */
export interface Palette {
    highlight : string;
    backgroundPrimary : string;
    backgroundSecondary : string;
    backgroundDark : string;
    font : string;
}

/**
 * The default palette, if the user switch back to the normal one.
 */
export const defaultPalette : Palette = {
    highlight: "rgb(54, 137, 247)",
    backgroundPrimary: "rgb(255, 255, 255)",
    backgroundSecondary: "rgb(235, 235, 235)",
    backgroundDark: "rgb(214, 214, 214)",
    font: "rgb(33, 32, 62)"
}

/**
 * A dark palette.
 */
export const darkPalette : Palette = {
    highlight: "rgb(255, 155, 68)",
    backgroundPrimary: "rgb(71, 71, 71)",
    backgroundSecondary: "rgb(51, 51, 51)",
    backgroundDark: "rgb(43, 43, 43)",
    font: "white"
}

/**
 * Pink. Nice.
 */
export const pinkPalette : Palette = {
    highlight: "rgb(244, 88, 145)",
    backgroundPrimary: "rgb(255, 221, 234)",
    backgroundSecondary: "rgb(255, 204, 223)",
    backgroundDark: "rgb(235, 194, 205)",
    font: "rgb(45, 39, 42)"
}

/**
 * Yellow. EPIC
 */
export const yellowPalette : Palette = {
    highlight: "rgb(42, 42, 42)",
    backgroundPrimary: "rgb(255, 215, 84)",
    backgroundSecondary: "rgb(240, 200, 60)",
    backgroundDark: "rgb(225, 190, 45)",
    font: "rgb(42, 42, 42)"
}

/**
 * Contains the property names of a palette.
 */
export const PROPERTIES : Palette = {
    highlight: "--color-highlight",
    backgroundPrimary: "--color-background-primary",
    backgroundSecondary: "--color-background-secondary",
    backgroundDark: "--color-background-dark",
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

    for (const property in PROPERTIES) {
        root.style.setProperty(PROPERTIES[property], p[property]);
    }
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
 * A button which brings up a popup that contains different palette buttons.
 */
export class ThemeSwitcher extends Component<{palettes : Palette[]}, {active : boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    onClick() {
        // the "active" state is forwarded as a prop to the PopupContainer component
        // when the state changes, it also changes the prop in the popup and hides/shows it.
        // the button in the PopupContainers "outerChildren" prop is what changes this state.
        this.setState({active: !this.state.active});
    }

    /**
     * Produces a PaletteButton for each palette
     * @param props the palettes to choose from
     */
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
                <PopupContainer outerChildren={<IconButton icon="color_lens" active={this.state.active} onClick={() => this.onClick()}/>} isActive={this.state.active}>
                    <ul>
                        <Heading>{this.props.children || "Themes"}</Heading>
                        <this.Buttons palettes={this.props.palettes} />
                    </ul>
                </PopupContainer>
            </div>
        );
    }
}