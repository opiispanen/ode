class Ode {

    /**
     * 
     * @param {Object} settings 
     * @returns {Proxy}
     */
    constructor(settings = {}) {
        let template = '';

        Object.keys(settings).forEach((key) => {
            if (key === 'template')
                template = settings[key]
            else
                this[key] = settings[key];
        })

        this.element = this.initTemplate(template);

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
     */
    initTemplate(html) {
        const div = document.createElement('div');
        div.innerHTML = html.trim();
        
        return div; 
    }

    /**
     * 
     * @param {String} prop 
     * @param {Mixed} value 
     */
    updateTemplate(prop, value) {
        const el = this.element.querySelector(`[ode-${prop}]`)
        
        // Element not found, fail quietly
        if (!el)
            return false;

        // Basicly allow any content that is a String
        // or has a toString method
        if(!(value instanceof Function)
            && !(value instanceof HTMLElement)) {
            el.innerHTML = value;
        }

        // Empty the element's content and append the
        // updated value
        if (value instanceof HTMLElement) {
            el.innerHTML = ''
            el.appendChild(value)
        }
    }
}

export default Ode