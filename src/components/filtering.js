export function initFiltering(elements) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {                      
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {                       
                const el = document.createElement('option');
                el.value = name;
                el.textContent = name;
                return el;
            }))
        })
    }
    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = action.dataset.field; 
                        
            const input = action.parentElement.querySelector('input, select');
            if (input) {
                input.value = ''; 
            }
                        
            if (state && field in state) {
                state[field] = '';
            }
        }
        // @todo: #4.5 — отфильтровать данные 
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { 
                    filter[`filter[${elements[key].name}]`] = elements[key].value; 
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; 
    }

    return {
        updateIndexes,
        applyFiltering
    }
}