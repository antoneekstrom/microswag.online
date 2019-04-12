import React, { Component } from 'react';
import * as Components from './components';

import { getHeroImages } from '../content/content';
import { Centered } from './containers';

/**
 * A react component that renders an image.
 */
export class ImageComponent extends Component<{src : string, alt : string}, any> {

    getClassName() {
        return '';
    }

    render() {
        return (
            <img className={this.getClassName()} alt={this.props.alt} src={this.props.src}/>
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
        return 'image wide';
    }
    getStyle() {
        return {
            backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.7)), url("${this.props.src}")`
        };
    }
    render() {
        return (
            <div style={this.getStyle()} className={this.getClassName()}>{this.props.children}</div>
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
                <div className="image-slide image-container">

                    <Hero src={this.state.currentImage.getSource()}>
                        <Centered justify="flex-end" className="image-slide text-container">
                            <h1>{this.state.currentImage.getTitle()}</h1>
                        </Centered>
                        
                        <Centered className="image-slide button-container">
                            <div className="image-slide buttons">{this.getButtons()}</div>
                        </Centered>
                    </Hero>
                    
                </div>
            </div>
        );
    }
}

export default class HeroSlide extends Component<any, any> {
    render() {
        return <ImageSlide slideTimer={8000} images={getHeroImages()}/>;
    }
}