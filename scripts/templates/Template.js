export class Template {

    _create(pattern) {
        if(pattern._element) {
            if(pattern._attributes) {
                for(let key in pattern._attributes) {
                    pattern._element.setAttribute(key, pattern._attributes[key])
                }
            }

            if(pattern._events) {
                for(let key in pattern._events) {
                    pattern._element.addEventListener(key, pattern._events[key])
                }
            }

            for(let key in pattern) {
                if(key != '_element' && key != '_attributes' && key != '_events') {
                    this._create(pattern[key])
                    pattern._element.appendChild(pattern[key]._element)
                }
            }
        }
    }
}