import React, { Component } from 'react';
import * as Components from './components';

import { getHeroImages } from '../content/content';

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

export class Hero extends ImageComponent {
    getClassName() {
        return super.getClassName() + ' wide';
    }
}

export class ImageSlide extends Component<{images : Image[]}, {currentImage : Image}> {

    constructor(props) {
        super(props);

        this.state = {
            currentImage: this.props.images[0]
        }
    }

    getImages() : Image[] {
        return this.props.images;
    }

    /**
     * Select an image to display.
     * @param imageIdentifier either a title or index to identify the image by.
     */
    selectImage(imageIdentifier : string | number) : void {

        // find an image that matches the identifier in some way.
        let newImage = this.getImages().find((val, i) => imageIdentifier == val.getTitle() || imageIdentifier == i);

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

    render() {
        // Use map to get the component from every image object and add them into a new array.
        // let images = this.getImages().map((img, i) => {
        //     return <Hero key={i} alt={img.getAlt()} src={img.getSource()} />
        // });

        let image = <Hero src={this.state.currentImage.getSource()} alt={this.state.currentImage.getAlt()}/>;

        return (
            <div className="image-slide">
                <div className="image-slide image-container">{image}</div>
                <h3>{this.state.currentImage.getTitle()}</h3>

                <div className="image-slide buttons">
                    <Components.Button onClick={() => this.nextImage()}>next</Components.Button>
                    <Components.Button onClick={() => this.previousImage()}>previous</Components.Button>
                </div>
            </div>
        );
    }
}

export default class HeroSlide extends Component<any, any> {
    render() {
        return <ImageSlide images={getHeroImages()} />;
    }
}