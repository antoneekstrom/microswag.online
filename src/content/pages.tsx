import React, { Component } from 'react';

import { createComponentPath, createDynamicComponent, ComponentPath, Loader, createLoaderElement } from '../loading/loader';
import * as Components from "../components/components";
import { Page, Main, Content } from '../components/containers';
import * as Navigation from "../components/navigation";
import Resources from "../content/resources";

import * as Routing from "../routing/routing";
import { pages } from '../index';
import { SlideContainer } from '../components/animated';
import { ImageComponent, ALIGN_RIGHT, ALIGN_LEFT } from '../components/image';

export class HomePage extends Component<any, any> {
    render() {
        return (
            <Main>
                <Components.LoadContainer component="slide" loadingComponent={<Components.Loading />} />

                <Content>

                    <Components.Title large>{Resources.siteName}</Components.Title>

                    <Components.Header>
                        Du befinner dig vid det här tillfället på en webbplats som kallas för <Components.Highlight>{Resources.siteName}</Components.Highlight> och det kan vara det bästa som har hänt dig sedan du var nära på att bli överkörd den där gången du vet.
                        </Components.Header>

                    <Components.Title>Spela boule nu med det samma?</Components.Title>

                    <Components.Paragraph>
                        Om du, som en individ och person, känner att du vill uppleva någonting helt
                        extraordinärt och fantastiskt, då skulle jag rekommendera att du spelar Boule.
                        Boule är det bästa som har hänt mänskligheten sedan frisbeegolf.
                    </Components.Paragraph>
                </Content>
                <ImageComponent align={ALIGN_LEFT} alt="pee" src="static/images/thanos.jpg" width={"45%"}>
                    <div>
                        <Components.Header>Poo</Components.Header>
                        <Components.Paragraph>I must say, I really do have pee on my brain. Sometimes, when my pee pee hard,
                        I think about crash badnicooch.
                        </Components.Paragraph>
                    </div>
                </ImageComponent>
                <ImageComponent align={ALIGN_RIGHT} alt="pee" src="static/images/golden_scar.jpg" width={"45%"}>
                    <div>
                        <Components.Header>
                            Chimpans
                        </Components.Header>
                        <Components.Paragraph>
                            yaaaas queen, slay 55892792349
                        </Components.Paragraph>
                    </div>
                </ImageComponent>
                <Content>
                    <Components.Header>
                        Peeeeee
                        peerem pipspee poo
                    </Components.Header>
                </Content>
            </Main>
        );
    }
}

export class OtherPage extends Component<any, any> {
    render() {
        return (
            <Main>
                <Content>
                    <Components.Title>Boule</Components.Title>
                </Content>
            </Main>
        );
    }
}