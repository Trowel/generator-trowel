class Trowel<%= props.names.pascalcase.plural %> {
    constructor(elements) {
        elements.forEach(function(element, index) {
            let element_obj = new Trowel<%= props.names.pascalcase.singular %>(element);
        })
    }
}

class Trowel<%= props.names.pascalcase.singular %> {
    constructor(element) {
        this.element = element;
        console.log(this.element);
    }
}
