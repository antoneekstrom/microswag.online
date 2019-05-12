
import React, { Component } from 'react';
import { Heading, Paragraph } from '../components/components';
import { Link } from '../components/buttons';

// the footer didn't fit anywhere else

/**
 * A footer at the bottom of the page.
 */
export class Footer extends Component<any, any> {
    render() {
        return (
            <footer>
                <Heading>Kontakt Information</Heading>
                <Paragraph>mail: <Link href="mailto:anton.e.ekstrom@gmail.com">anton.e.ekstrom@gmail.com</Link></Paragraph>
                <Paragraph>skol-mail: <Link href="mailto:anton.ekstrom@elev.kungsbacka.se">anton.e.ekstrom@gmail.com</Link></Paragraph>
            </footer>
        );
    }
}