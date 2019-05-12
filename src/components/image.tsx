import React, { Component } from 'react';

import { Centered } from './containers';

import MediaQuery from 'react-responsive';
import { CONTENT_WIDTH_BREAKPOINT } from './navigation';


// components relating to images

// alignments
export const ALIGN_LEFT = "left", ALIGN_RIGHT = "right";

/**
 * A react component that renders an image.
 * An image can be aligned to the left or right to make space for other content.
 * This additional content can be by added as children.
 */
export class ImageComponent extends Component<{src : string, alt : string, width ?: string, align ?: string, imageClass ?: string}, any> {

    constructor(props) {
        super(props);
    }
    
    render() {
        // this method is a mess
        return (
            <MediaQuery query={`(max-width: ${CONTENT_WIDTH_BREAKPOINT})`}>
            {
                (matches) => {

                    // true means right and false means left
                    // turns the alignment string into a boolean
                    let align = this.props.align == ALIGN_RIGHT ? true : false;

                    let children = this.props.children;
                    let Content = (props) => (
                        <React.Fragment>
                            <img style={{width: !matches ? this.props.width : "100%", order: align && !matches ? 2 : 0}} className={`image-component ${this.props.imageClass || ''} ${align ? 'right' : 'left'}`} alt={this.props.alt} src={this.props.src}/>
                            {children}
                        </React.Fragment>
                    );

                    const containerClass = `image-container ${matches ? "mobile" : "desktop"}`;

                    // two different containers depending on browser width
                    // changes from horizontal alignment to vertical on smaller devices

                    let Mobile = (props) => {
                        return (
                            <Centered direction="column" className={containerClass}>
                                <Content/>
                            </Centered>
                        );
                    };

                    let Desktop = (props) => (
                        <Centered direction="row" justify={align ? 'flex-end' : 'flex-start'} className={containerClass}>
                            <Content/>
                        </Centered>
                    );

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

    // specifying scope keywords before constructor arguments automatically stores them as variables with that scope inside the class
    // this is a handy feature in typescript that I should be using more often
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

/**
 * A wide "hero" image.
 */
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

/**
 * A button on the image slideshow that represents an image.
 * It is highlighted if the image is currently showing, otherwise you can click it to change to another image.
 */
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

/**
 * A slideshow of images that can change on a set interval. It also has buttons for choosing which image is being displayed.
 * 
 * @param showText Set if the title of the image should be shown. It kind of looks weird therefore there is a parameter to disable it
 */
export class ImageSlide extends Component<{images : Image[], slideTimer ?: number, showText ?: boolean}, {currentImage : Image}> {

    timerID : any;

    constructor(props) {
        super(props);

        // currently shown image is stored in state
        // changing this rerenders the component and shows the image automatically
        this.state = {
            currentImage: this.props.images[0]
        }
    }

    componentDidMount() {
        // set a timer which changes the image on an interval
        if (this.props.slideTimer) {
            this.timerID = setInterval(() => this.nextImage(),
            this.props.slideTimer);
        }
    }

    componentWillUnmount() {
        // remove the timer when the component is removed
        if (this.timerID) {
            clearInterval(this.timerID);
        }
    }

    /**
     * Get the images.
     */
    getImages() : Image[] {
        return this.props.images;
    }

    /**
     * Get an image.
     * @param imageIdentifier an identifier for the image. This can either be the index in the slideshow or the title of the image
     */
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

    /**
     * Get the index of the current image
     */
    getCurrentIndex() {
        return this.getImages().indexOf(this.state.currentImage);
    }

    /**
     * Show the next image.
     */
    nextImage() {
        let nextIndex = this.getCurrentIndex() + 1;
        this.selectImage(nextIndex >= this.props.images.length ? 0 : nextIndex);
    }

    /**
     * Show the previous image.
     */
    previousImage() {
        let nextIndex = this.getCurrentIndex() - 1;
        this.selectImage(nextIndex < 0 ? this.props.images.length - 1 : nextIndex);
    }

    /**
     * Determines if an image is currently being shown.
     * @param imageIdentifier the identifier of that image
     */
    isImageActive(imageIdentifier : string | number) : boolean {
        return this.getImage(imageIdentifier) == this.state.currentImage;
    }

    /**
     * Creates an array of buttons were each of the correspond to an image
     */
    getButtons() : JSX.Element[] {
        let buttons = this.props.images.map((img, i) => {
            return <SelectionDot key={i} onClick={() => this.selectImage(i)} active={this.isImageActive(i)}/>;
        });

        return buttons;
    }

    render() {

        let TextContainer = (props) => (
            <Centered justify="flex-end" className="image-slide text-container">
                <h1>{this.state.currentImage.getTitle()}</h1>
            </Centered>
        );

        return (
            <div className="image-slide">
                    <Hero src={this.state.currentImage.getSource()}>
                        {this.props.showText == undefined || this.props.showText == true ? <TextContainer/> : undefined}
                        
                        <Centered style={{gridArea: "buttons"}} className="image-slide button-container">
                            <div className="image-slide buttons">{this.getButtons()}</div>
                        </Centered>
                    </Hero>
            </div>
        );
    }
}