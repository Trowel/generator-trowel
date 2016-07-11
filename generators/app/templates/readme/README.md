# Trowel-<%= props.name %>
[![GitHub version](https://badge.fury.io/gh/trowel%2F<%= props.name %>.svg)](https://badge.fury.io/gh/trowel%2F<%= props.name %>)
[![Bower version](https://badge.fury.io/bo/trowel-<%= props.name %>.svg)](https://badge.fury.io/bo/trowel-<%= props.name %>)

<%= props.description %>
<%= props.name %> is designed with the trowel philosophy. Please refer to the [Trowel documentation](http://trowel.github.io/) for more informations.

## Getting Started
### Download
You can easily install trowel-<%= props.name %> by using Bower, a package manager for front-end components. (See bower.io for more details)

```bash
$ bower install trowel-<%= props.name %>
```

You can also download a zip archive clicking [right here](<%= props.url %>/archive/master.zip).

### Working files
<% if (props.scss) { %>#### `.scss` files
The main scss file is located at the `./<%= folders.src %>/scss/<%= props.name %>.scss`. This file is ready to be included into your scss files. The compiled and minified version is available at `<%= folders.dest %>/css/<%= props.name %>.min.css`.<% } %>

<% if (props.css) { %>#### `.css` files
The css file is located at the `./<%= folders.dest %>/css/<%= props.name %>.css`. The optimized and minified version is available at `<%= folders.dest %>/css/<%= props.name %>.min.css`.<% } %>

<% if (props.javascript) { %>#### `.js` files
The javascript file is located at the `./<%= folders.dest %>/javascript/<%= props.name %>.js`. The optimized and minified version is available at `<%= folders.dest %>/javascript/<%= props.name %>.min.js`.<% } %>

<% if (props.twig) { %>#### `.html.twig` file
The twig file is located at the `./<%= folders.src %>/twig/<%= props.name %>.html.twig`.<% } %>

## Usage
to be written

## License
MIT © [Trowel](trowel.github.io)
