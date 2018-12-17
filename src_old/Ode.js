class Ode {

    /**
     * Assign properties and methods from the
     * settings object and initialize the template
     * 
     * @param {Object} settings 
     * @returns {Proxy}
     */
    constructor(settings = {}) {
        let template = '';
        
        this.element = this.initTemplate(settings.template);

        Object.keys(settings).forEach((key) => {
            let value = settings[key];

            if (key !== 'template' && !Array.isArray(value) && typeof value !== 'function') {

                if (typeof value === 'object') {
                    const element = this.element.querySelector(`[ode-${key}]`)
                    
                    value.template = element.innerHTML;

                    element.innerHTML = '';

                    value = new Ode(value);
                } 
                    
                this.updateTemplate(key, value)
            }   

            this[key] = value;
        })

        /**
         * Return a Proxy that hooks the set handler
         * and triggers template updating
         */
        return new Proxy(this, {
            set: (obj, prop, value) => {
                if (prop !== 'element')
                    this.updateTemplate(prop, value)

                obj[prop] = value

                return true;
            }
        })
    }

    /**
     * Create a DOM object with the html string provided
     * 
     * @param {String} html 
     * @returns {HTMLElement}
     */
    initTemplate(html) {
        const div = document.createElement('div');
        div.innerHTML = html.trim();
        
        return div; 
    }

    /**
     * Return the parent element's innerHTML
     * 
     * @returns {String}
     */
    toString() {
        return this.element.innerHTML
    }

    /**
     * 
     * @param {String} prop 
     * @param {Mixed} value 
     * @returns {Boolean}
     */
    updateTemplate(prop, value) {
        if (/\$/.test(prop))
            return false;

        const el = this.element.querySelector(`[ode-${prop}]`)
        
        // Element not found, fail quietly
        if (!el)
            return false;

        // Basicly allow any content that is a String
        if(!(value instanceof Function)
            && !(value instanceof HTMLElement)
            && !(value instanceof Array)) {
            el.innerHTML = value;
            return true;
        }

        // With arrays, just join them
        if (value instanceof Array) {
            el.innerHTML = value.join('');
            return true;
        }

        // Empty the element's content and append the
        // updated value
        if (value instanceof HTMLElement) {
            el.innerHTML = '';
            el.appendChild(value);
            return true;
        }

        // Value may be an object (like this) with a toString method
        if (typeof value.toString === 'function') {
            el.innerHTML = value.toString();
            return true;
        }

        return false;
    }
}

export default Ode