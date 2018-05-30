import Ode from './Ode.js'
import OdeRouter from './OdeRouter.js'

const base = new Ode({
    template: `
        <nav>
            <a href="#html/">HTML</a> |
            <a href="#css/">CSS</a> |
            <a href="#js/">JavaScript</a>
        </nav>
        <div ode-route></div>
    `
})

const routes = {
    html: new Ode({
        template: `
            HTML is a markup language for the Web
        `
    }),
    css: new Ode({
        template: `
          CSS is a styling language for the <span ode-nested><span ode-obj><span ode-value></span></span></span>
        `,
        nested: {
            obj: {
                value: 'WEB'
            }
        }
    }),
    js: new Ode({
        template: `
            JS is a programming language for the Web <span ode-time></span>
        `,
        $onRouteChange: function() {
            console.log(this, arguments)
        }
    }),
    otherwise: 'html'
}

const router = new OdeRouter(routes, base)

document.body.appendChild(base.element);

(function loop() {
    routes.js.time = Date.now()

    setTimeout(loop, 1000)
})()