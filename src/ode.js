export const query = document.querySelector.bind(document)

/**
 * @param {any} initialValue 
 * @returns {Proxy}
 */
export function createProxy(initialValue) {
    const type = typeof initialValue;

    if (type === 'function') {
        throw 'Ode: Invalid type (function)'
    }
    // TODO: handle different types: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
    const callbacks = [];
    const onChange = (callback) => {
        const id = callbacks.length + 1;

        callbacks.push({
            id,
            callback,
        })

        return () => {
            const index = callbacks.findIndex(row => row.id === id);

            callbacks.splice(index, 1);
        }
    }

    if (Array.isArray(initialValue) 
        || (type === 'object' && initialValue !== null)) {
        const handler = {
            set(target, property, value) {
                if (property in target) {
                    console.log(`Element at index ${property} updated from ${target[property]} to ${value}`);
                } else {
                    console.log(`New element added at index ${property}: ${value}`);
                }

                target[property] = value;

                for (let onChange of callbacks) {
                    onChange.callback(target)
                }

                return true;
            },
            deleteProperty(target, property) {
                console.log(`Element at index ${property} deleted: ${target[property]}`);
                
                // Perform the delete
                return Reflect.deleteProperty(target, property);
            },
        }
        return {
            value: new Proxy(initialValue, handler),
            onChange,
        }
    }

    return new Proxy(
        {
            value: initialValue,
            onChange,
        },
        {
            set(target, property, value) {
                if (property === 'value') {
                    target[property] = value;
                    
                    for (let onChange of callbacks) {
                        onChange.callback(target[property])
                    }
                }

                return true;
            }
        }
    )
}