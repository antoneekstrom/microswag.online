
import * as Loadable from 'react-loadable';

import React, { Component } from 'react';

// Plugin used for dynamically loading in react components
// This improves initial load times cause the loading can be split up and done asynchronously
// Components won't be loaded if they aren't being used

export interface ComponentPath {
	filePath : string;
	componentName : string;
	getComponentPath : () => string;
}

export class Loader {

	filePath : string;

	loadingComponent : JSX.Element;

	setLoadingComponent(loadingComponent : JSX.Element) {
		this.loadingComponent = loadingComponent;
	}

	setFilePath(filePath : string) {
		this.filePath = filePath;
	}

	construct(chunkName : string, componentName ?: string) : JSX.Element {
		let componentPath = createComponentPath(this.filePath, componentName);

		console.log(componentPath.getComponentPath());

		return createDynamicComponent(componentPath, this.loadingComponent, chunkName);
	}
}

export function createComponentPath(filePath : string, componentName ?: string) : ComponentPath {
	return {
		filePath: filePath,
		componentName: componentName,
		getComponentPath: () => `${filePath}${componentName ? "/" + componentName : ''}`
	};
}

export function createLoaderElement(loader : () => void, loadingComponent : JSX.Element) {

	let Loader = Loadable({
        loader: loader,
        loading() {
          return loadingComponent
        }
	});

    return <Loader/>;
}

export function createDynamicComponent(componentPath : ComponentPath, loadingComponent : JSX.Element, chunkName : string) : JSX.Element {
	return createLoaderElement(() => import(/* webpackChunkName: "[request]" */`${componentPath.getComponentPath()}/${chunkName}`), loadingComponent);
}