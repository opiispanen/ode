export const query = document.querySelector.bind(document)

/**
 * @param {any} initialValue 
 * @returns {Proxy}
 */
export function createProxy(initialValue) {
    const callbacks = [];

    return new Proxy(
        {
            value: initialValue,
            onChange(callback) {
                const id = callbacks.length + 1;

                callbacks.push({
                    id,
                    callback,
                })

                return () => {
                    const index = callbacks.findIndex(row => row.id === id);

                    callbacks.splice(index, 1);
                }
            },
        },
        {
            set(obj, prop, value) {
                if (prop === 'value') {
                    obj[prop] = value;
                    
                    for (let onChange of callbacks) {
                        onChange.callback(obj[prop])
                    }
                }

                return true;
            }
        }
    )
}