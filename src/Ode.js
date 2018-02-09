class Ode {
    constructor(settings = {}) {
        const settingKeys = Object.keys(settings);
        
        let template = '';

        settingKeys.forEach((key) => {
            if (key === 'template')
                template = settings[key]
            else
                this[key] = settings[key];
        })

        this.element = this.initTemplate(template);

        return new Proxy(this, {
            set: (obj, prop, value) => {
                if (prop !== 'element' 
                        && !(value instanceof Function)
                        && !(value instanceof HTMLElement))
                    this.updateTemplate(prop, value)

                if (value instanceof HTMLElement)
                    this.setHtml(prop, value)

                obj[prop] = value

                return true;
            }
        })
    }

    get innerHTML() {
        return this.element.innerHTML
    }

    initTemplate(html) {
        const div = document.createElement('div');
        div.innerHTML = html.trim();
        
        return div; 
    }

    updateTemplate(prop, value) {
        const el = this.element.querySelector(`[ode-${prop}]`)
        
        if (!el)
            return false;

        el.innerHTML = value;
    }

    setHtml(prop, value) {
        const el = this.element.querySelector(`[ode-${prop}]`)
        
        if (!el)
            return false;

        el.innerHTML = ''
        el.appendChild(value)
    }
}

export default Ode