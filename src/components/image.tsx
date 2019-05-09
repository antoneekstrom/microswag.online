import React, { Component } from 'react';
import * as Components from './components';

import { getHeroImages } from '../content/content';
import { Centered } from './containers';

import MediaQuery from 'react-responsive';

export const ALIGN_LEFT = "left", ALIGN_RIGHT = "right";

/**
 * A react component that renders an image.
 * An image can be aligned to the left or right to make space for other content.
 * This additional content can be by added as children.
 */
export class ImageComponent extends Component<{src : string, alt : string, width ?: string, align ?: string}, any> {
    render() {
        return (
            <MediaQuery query="(max-width: 500px)">
            {
                (matches) => {

                    let align = this.props.align == ALIGN_RIGHT ? true : false;

                    let children = this.props.children;
                    let Content = (props) => (
                        <React.Fragment>
                            <img style={{width: this.props.width, order: align ? 2 : 0}} className={`image-component ${align ? 'right' : 'left'}`} alt={this.props.alt} src={this.props.src}/>
                            {children}
                        </React.Fragment>
                    );

                    let Mobile = (props) => <Centered direction="column" className="image-container">
                        <Content/>
                    </Centered>;

                    let Desktop = (props) => <Centered direction="row" justify={align ? 'flex-end' : 'flex-start'} className="image-container">
                        <Content/>
                    </Centered>;

                    return matches ? <Mobile/> : <Desktop/>;
                }
            }
            </MediaQuery>
        );
    }
}

/**
 * Encapsulates data that is commonly related to images. I did this so that the ImageSlide component should be easier to maintain.
 * 
 * Storing a title with the image enables the possibility to specify an image from it's title.
 * 
 * @see ImageComponent
 */
export class Image {

    constructor(private src : string, private title : string, private alt : string) {}

    getComponent(key ?: any) : JSX.Element {
        return <ImageComponent alt={this.alt} key={key} src={this.src}/>;
    }

    getTitle() : string {
        return this.title;
    }
    
    getSource() : string {
        return this.src;
    }

    getAlt() : string {
        return this.alt;
    }
}

export class Hero extends Component<{src : string}, any> {
    getClassName() : string {
        return 'hero';
    }
    render() {
        return (
            <div className={this.getClassName()}>
                <img src={this.props.src} />
                <div className="hero-inner-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export class SelectionDot extends Component<{onClick : () => void, active : boolean}, any> {
    onClick() {
        this.props.onClick();
    }
    render() {
        return (
            <button onClick={() => this.onClick()} className={`button dot ${this.props.active ? 'active' : ''}`}></button>
        );
    }
}

export class ImageSlide extends Component<{images : Image[], slideTimer ?: number}, {currentImage : Image}> {

    timerID : any;

    constructor(props) {
        super(props);

        this.state = {
            currentImage: this.props.images[0]
        }
    }

    componentDidMount() {
        if (this.props.slideTimer) {
            this.timerID = setInterval(() => this.nextImage(),
            this.props.slideTimer);
        }
    }

    componentWillUnmount() {
        if (this.timerID) {
            clearInterval(this.timerID);
        }
    }

    getImages() : Image[] {
        return this.props.images;
    }

    getImage(imageIdentifier : string | number) : Image {
        return this.getImages().find((val, i) => imageIdentifier == val.getTitle() || imageIdentifier == i);
    }

    /**
     * Select an image to display.
     * @param imageIdentifier either a title or index to identify the image by.
     */
    selectImage(imageIdentifier : string | number) : void {

        // find an image that matches the identifier in some way.
        let newImage = this.getImage(imageIdentifier);

        if (newImage != undefined || newImage != this.state.currentImage)
        this.setState({currentImage: newImage});
    }

    getCurrentIndex() {
        return this.getImages().indexOf(this.state.currentImage);
    }

    nextImage() {
        let nextIndex = this.getCurrentIndex() + 1;
        this.selectImage(nextIndex >= this.props.images.length ? 0 : nextIndex);
    }

    previousImage() {
        let nextIndex = this.getCurrentIndex() - 1;
        this.selectImage(nextIndex < 0 ? this.props.images.length - 1 : nextIndex);
    }

    isButtonActive(imageIdentifier : string | number) : boolean {
        return this.getImage(imageIdentifier) == this.state.currentImage;
    }

    getButtons() : JSX.Element[] {
        let buttons = this.props.images.map((img, i) => {
            return <SelectionDot key={i} onClick={() => this.selectImage(i)} active={this.isButtonActive(i)}/>;
        });

        return buttons;
    }

    render() {

        return (
            <div className="image-slide">
                    <Hero src={this.state.currentImage.getSource()}>
                        <Centered justify="flex-end" className="image-slide text-container">
                            <h1>{this.state.currentImage.getTitle()}</h1>
                        </Centered>
                        
                        <Centered className="image-slide button-container">
                            <div className="image-slide buttons">{this.getButtons()}</div>
                        </Centered>
                    </Hero>
            </div>
        );
    }
}

export default class HeroSlide extends Component<any, any> {
    render() {
        return <ImageSlide slideTimer={8000} images={getHeroImages()}/>;
    }
}