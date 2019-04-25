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
            <Main>
                <Components.LoadContainer component="slide" loadingComponent={<Components.Loading />} />

                <Content>

                    <Components.Title large>{Resources.siteName}</Components.Title>

                    <Components.Header>
                        Du befinner dig vid det här tillfället på en webbplats som kallas för <Components.Highlight>{Resources.siteName}</Components.Highlight> och det kan vara det bästa som har hänt dig sedan du var nära på att bli överkörd den där gången du vet.
                        </Components.Header>

                    <Components.Title>Spela boule nu med det samma?</Components.Title>
                    <Components.Header>
                        Jag tycker att du borde spela boule. Nu.
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