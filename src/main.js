import Ode from './Ode.js';

const app = new Ode({
    mount: '#app',
    template: `<div>
            <h2>Ode Rewrite</h2>
            <div id="value"></div>
            <div id="input"></div>
        </div>`
});

const mainState = app.addState('main', {
    counter: 0
});

const valueDisplay = app.addComponent({
    elementType: 'span',
    template: `Value is now <span data-value></span>`,
    stateListeners: {
        main: {
            counter(value) {
                console.log('counter', value);
                this.element.querySelector('[data-value]').innerHTML = value;
            }
        }
    },
    onInit() {
        const state = this.getState('main');

        this.element.querySelector('[data-value]').innerHTML = state.counter;

        // this.parent.querySelector('#value').replaceWith(this.element);
    }
})

app.addComponent({
    template: `<button data-plus>+</button>
        <span data-value></span>
        <button data-minus>-</button>`,
    onInit() {
        const state = mainState;
        const plus = this.element.querySelector('[data-plus]');
        const minus = this.element.querySelector('[data-minus]');

        plus.addEventListener('click', () => {
            state.counter += 1;
        })

        minus.addEventListener('click', () => {
            state.counter -= 1;
        })

        this.element.querySelector('[data-value]').replaceWith(valueDisplay.element);
        
        this.parent.querySelector('#input').replaceWith(this.element);
    }
})