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
          CSS is a styling language for the Web
        `
    }),
    js: new Ode({
        template: `
            JS is a programming language for the Web <span ode-time></span>
        `,
        $onStateChange: function(path) {
            console.log(this, path)
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