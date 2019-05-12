
/**
 * @returns {URL} an URL object representing the current URL
 */
export function getURL() : URL {
    return new URL(window.location.href);
}

/**
 * @returns {string} the URL parameter of 'page'
 */
export function getPage() : string {
    return getURL().searchParams.get('page');
}

/**
 * 
 * @param parameter the url parameter
 * @param value the value to set the parameter to
 * @param data the optional data to include
 */
export function setUrlParameter(parameter : string, value : string, data ?: any) {
    // Create URL obj
    var url : URL = new URL(window.location.href);

    // Change the parameter
    url.searchParams.set(parameter, value);

    // Push the new URL
    history.pushState(data, '', url.href);
}

/**
 * Set the page URL parameter
 * @param path the path to set the parameter to
 * @param data the optional data to provide for the state event
 */
export function setPage(path : string, data ?: any) {

    // Set the page paramater
    setUrlParameter('page', path, data);

    // Manually trigger onpopstate
    var popStateEvent = new PopStateEvent('popstate', { state: data });
    dispatchEvent(popStateEvent);
}

/**
 * Map a string that is the route to a page.
 */
export interface PageMap { [route : string] : JSX.Element; }

/**
 * Take in a page element and do something with it.
 */
export type ElementConsumer = (page : JSX.Element) => void;

/**
 * Take in a page route and do something with it.
 */
export type pageObserver = (page : string) => void;

/**
 * A collection of the observers which are currently observing the url.
 */
let PageObservers : pageObserver[] = [];

/**
 * Be notified when the page changes.
 * @param observer the observer
 */
export function observePage(observer : pageObserver) {
    PageObservers.push(observer);
}

/**
 * 
 * @param observer 
 */
export function unobservePage(observer : pageObserver) {
    let i = PageObservers.indexOf(observer);
    if (i != -1) PageObservers.splice(i);
}

/**
 * 
 */
window.onpopstate = function (e) {
    PageObservers.forEach(observer => observer(getPage()));
}

/**
 * 
 */
export class Router {

    pageConsumer : ElementConsumer;

    pages : PageMap;

    pageObserver : pageObserver;

    fallbackRoute : string;

    /**
     * Construct Router.
     * 
     * @param pages the pages to map routes to
     * @param pageConsumer the consumer which receives pages when they are routed to
     * @param fallbackRoute the route that will be used if the current one is invalid for some reason
     */
    constructor(pages : PageMap, pageConsumer : ElementConsumer, fallbackRoute : string) {
        this.pages = pages;
        this.pageConsumer = pageConsumer;
        this.fallbackRoute = fallbackRoute;

        this.pageObserver = (page) => {
            this.invokeConsumer();
        };
        observePage(this.pageObserver);
    }

    /**
     * Get the page for a certain route.
     * @param route the route
     * @returns the page
     */
    getRoutePage(route : string) : JSX.Element {
        return this.pages[route];
    }

    routeExists(route : string) : boolean {
        let exists = false;

        if (route == undefined) return exists;

        for (let r in this.pages) if (r == route) exists = true;

        return exists;
    }

    invokeConsumer() {
        const currentRoute = getPage();
        let found = false;

        if (this.routeExists(currentRoute))
        for (let route in this.pages) {

            let page : JSX.Element = this.getRoutePage(route);

            if (currentRoute == route) {
                this.pageConsumer(page);
                found = true;
            }
        }

        if (!found) {
            setUrlParameter('page', this.fallbackRoute);
            this.pageConsumer(this.getRoutePage(this.fallbackRoute));
        }
    }

    setPageConsumer(consumer : ElementConsumer) {
        this.pageConsumer = consumer;
    }

    /**
     * Set the page URL parameter
     * @param path the path to set the parameter to
     * @param data the optional data to provide for the state event
     */
    setPage(path : string, data ?: any) {
        setPage(path, data);
    }
}

export default Router;
