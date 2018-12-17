function registerElement(template) {
    const div = document.createElement('div');
    
    div.innerHTML = template.trim();
    
    return div; 
}

function createId() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let text = '';
    
    for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

class Ode {
    constructor(settings = {}) {
        this.$$element = registerElement(settings.template || '');
        this.$$state = {};
        this.$$stateListeners = {};
        this.$$components = {};

        if (typeof settings.mount !== 'undefined') {
            document
                .querySelector(settings.mount)
                .appendChild(this.$$element);
        }
    }

    addComponent(component) {
        const id = createId();
        const element = registerElement(component.template);
        const obj = {
            id,
            element
        };
        const self = Object.assign(obj, {
            parent: this.$$element,
            components: this.$$components,
            getState: (context) => Object.assign({}, this.$$state[context])
        });

        if (typeof component.onInit === 'function') {
            component.onInit.call(self);
        }

        if (typeof component.stateListeners !== 'undefined') {
            Object.keys(component.stateListeners).forEach(contextName => {
                const context = component.stateListeners[contextName];

                Object.keys(context).forEach(prop => {
                    if (typeof context[prop] === 'function') {
                        this.addStateListener(contextName, prop, context[prop].bind(self));
                    }
                })
            })
        }

        this.$$components[id] = obj;

        return obj;
    }

    addState(context, defaultValues = {}) {
        if (typeof this.$$state[context] === 'undefined') {
            this.$$state[context] = new Proxy(defaultValues, {
                set: (obj, prop, value) => {
                    const stateListener = this.$$stateListeners[context];

                    if (typeof stateListener !== 'undefined' 
                            && typeof stateListener[prop] !== 'undefined'
                            && Array.isArray(stateListener[prop])) {
                        stateListener[prop].forEach(callback => {
                            if (typeof callback === 'function') {
                                callback(value);
                            }
                        });
                    }
                    
                    obj[prop] = value;
    
                    return true;
                }
            });
        } else {
            this.$$state[context] = Object.assign(this.$$state[context], defaultValues);
        }

        return this.$$state[context];
    }

    addStateListener(context, prop, callback) {
        if (typeof this.$$stateListeners[context] === 'undefined') {
            this.$$stateListeners[context] = {};
        }

        if (typeof this.$$stateListeners[context][prop] === 'undefined') {
            this.$$stateListeners[context][prop] = [];
        }

        if (typeof callback === 'function') {
            this.$$stateListeners[context][prop].push(callback);
        } else {
            console.warn(context, prop, 'callback is not a function!');
        }
    }
}

export default Ode