import Ode from './Ode.js'

class OdeRouter {
    constructor(routes, template) {
        this.element = template instanceof Ode ? template : new Ode({ template })
        this.routes = routes

        window.addEventListener('hashchange', this.setState.bind(this), false);

        this.setState({
            newURL: location.href
        })
    }

    setState(event) {
        const origin = location.origin+location.pathname,
              path = event.newURL.replace(origin, '').replace('#','').split('/'),
              hash = path[0],
              route = this.routes[!!hash ? hash : this.routes.otherwise];
              
        if (!hash || !route)
            location.hash = this.routes.otherwise

        if (!route)
            return false;
        
        this.element.route = route.element
        
        if (typeof route.$onStateChange === 'function') {
            path.shift()
            route.$onStateChange(path)
        }
    }
}

export default OdeRouter