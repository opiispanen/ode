import Ode from './Ode.js'

class OdeRouter {
    /**
     * 
     * @param {Object} routes 
     * @param {String} template // Ode object also accepted
     */
    constructor(routes = {}, template = '<div ode-route></div>') {
        this.element = template instanceof Ode ? template : new Ode({ template })
        this.routes = routes

        // Set event listener to the browser url hash change
        window.addEventListener('hashchange', this.setRoute.bind(this), false);

        // Trigger the first route
        this.setRoute({
            newURL: location.href
        })
    }

    /**
     * The hash has to be parsed from the URL so some
     * steps needs to be taken:
     *   - Construct the origin url
     *   - Remove the origin url from the actual path url
     *   - Remove the "#" character
     *   - Split the remaining part by the "/" character
     *   thus making the path itself
     *   - Route name will be the first item in the path array
     *   - Check if the route name is available, if not use the
     *   "otherwise" route
     * 
     * Fail quietly (do nothing) if the "otherwise" route is not set.
     * 
     * @param {Object} event 
     */
    setRoute(event) {
        const origin = location.origin+location.pathname,
              path = event.newURL.replace(origin, '').replace('#','').split('/'),
              hash = path[0],
              route = this.routes[!!hash ? hash : this.routes.otherwise];
              
        // When the hash is empty or route is not found
        // set the hash as the "otherwise" route.
        // Changing the location.hash makes the browser
        // trigger the hashchange event.
        if (!hash || !route)
            location.hash = this.routes.otherwise

        // No route found, no change
        if (!route)
            return false;
        
        // This will trigger the parent element's (Ode object)
        // to change its route content
        this.element.route = route.element
        
        // If the route has a hook for route change, trigger it
        if (typeof route.$onRouteChange === 'function') {
            // Pathname is now useless and can be removed
            path.shift()

            // Trigger the hook and ensure its "this"
            // is the route object itself and provide
            // the additional data from the path
            route.$onRouteChange.apply(route, path)
        }
    }
}

export default OdeRouter