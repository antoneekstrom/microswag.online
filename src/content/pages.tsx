import React, { Component } from 'react';

import { createComponentPath, createDynamicComponent, ComponentPath, Loader, createLoaderElement } from '../loading/loader';
import * as Components from "../components/components";
import { Page, Main, Content } from '../components/containers';
import * as Navigation from "../components/navigation";
import Resources from "../content/resources";

import * as Routing from "../routing/routing";
import { pages } from '../index';
import { SlideContainer } from '../components/animated';

export class HomePage extends Component<any, any> {
    render() {
        return (
            <div>

                <Navigation.NavigationBar paths={pages}/>

                <Main>
                    <Components.LoadContainer component="slide" loadingComponent={<Components.Loading/>}/>

                    <Content>

                        <Components.Title large>{Resources.siteName}</Components.Title>
    
                        <Components.Header>
                            Du befinner dig vid det här tillfället på en webbplats som kallas för <Components.Highlight>{Resources.siteName}</Components.Highlight> och det kan vara det bästa som har hänt dig sedan du var nära på att bli överkörd den där gången du vet.
                        </Components.Header>

                        <Components.CardContainer>
                            <Components.Card title="Diarrhea">Yummy yummy, christmas tummy</Components.Card>
                            <Components.Card title="Wow, cringe">You're nothing but a cholo to me.</Components.Card>
                            <Components.Card title="Nibbagrinch">AAAAAAAHHHHH, </Components.Card>
                        </Components.CardContainer>

                        <Components.Title>VERY NICE TITLE</Components.Title>
                        <Components.Paragraph>epic paragraph</Components.Paragraph>
                        <SlideContainer>
                            <Components.Title>SLIDINg COMPONEInt</Components.Title>
                        </SlideContainer>
                        <Components.Title>VERY (VERY) NICE TITLE</Components.Title>
                    </Content>
                </Main>
            </div>
        );
    }
}

export class OtherPage extends Component<any, any> {
    render() {
        return (
            <div>
                <Navigation.NavigationBar paths={pages} />

                <Main>
                    <Content>
                        <Components.Title>Boule</Components.Title>
                    </Content>
                </Main>
            </div>
        );
    }
}