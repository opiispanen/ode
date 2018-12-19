export function createElement(template, elementType = 'div') {
    const element = document.createElement(elementType);
    
    element.innerHTML = template.trim();
    
    return element; 
}

export function createId() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let text = '';
    
    for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}