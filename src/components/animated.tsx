
import React, { Component } from 'react';

export const LEFT = "left", RIGHT = "right";

/**
 * A component that slides in from the side when scrolled by.
 */
export class SlideContainer extends Component<{side ?: string}, {visible : boolean}> {

    /**
     * 
     */
    observer : IntersectionObserver;

    /**
     * 
     */
    ref : React.RefObject<any>;

    constructor(props) {
        super(props);
        this.ref = React.createRef();

        this.state = {
            visible: false
        };
    }

    componentDidMount() {

        this.observer = new IntersectionObserver((entries, observer) => {
            const e = entries[0];
            if (!e) return;

            this.setState({visible: e.isIntersecting});
        });
        this.observer.observe(this.ref.current);
    }

    componentWillUnmount() {
        this.observer.unobserve(this.ref.current);
        this.observer.disconnect();
    }

    render() {
        return (
            <div className={`sliding-container${!this.state.visible ? ' hidden' : ''}`} ref={this.ref}>{this.props.children}</div>
        );
    }
}