![Friends of Trowel](https://raw.githubusercontent.com/Trowel/Trowel/master/media/dist/banners/friendsoftrowel-black-on-transparent.png)

# Trowel-<%= props.name %>
[![npm version](https://badge.fury.io/js/trowel-<%= props.name %>.svg)](https://badge.fury.io/js/trowel)
[![Bower version](https://badge.fury.io/bo/trowel-<%= props.name %>.svg)](https://badge.fury.io/bo/trowel-<%= props.name %>)

<%= props.description %>
<%= props.name %> is a *Trowel Component*, please refer to the [Trowel doc](http://trowel.github.io/) for more informations about how works *Trowel Components*

## Getting Started
### Download
You can easily install trowel-<%= props.name %> by using NPM or Bower

```bash
$ bower install trowel-<%= props.name %>
$ npm install trowel-<%= props.name %>
```

You can also download a zip archive [right here](<%= props.url %>/archive/master.zip).

### Installation
#### *SCSS*
The main scss file to include to your main `.scss` file is located at the `./<%= folders.src %>/scss/<%= props.name %>.scss`. As a *Trowel Component*, it also requires two dependencies to compile the *scss* code. Here an *scss* installation snippet.

```
// Trowel Dependencies
@import './path/to/dependencies/sassy-maps/sass/sassy-maps';
@import './path/to/dependencies/trowel-core/src/trowel';

// <%= props.name %> * Trowel Components
@import './path/to/dependencies/<%= folders.src %>/scss/<%= props.name %>.scss';
```

<% if (props.javascript) { %>#### *JavaScript*
The javascript file is located at the `./<%= folders.dest %>/javascript/<%= props.name %>.js`. The optimized and minified version is available at `<%= folders.dest %>/javascript/<%= props.name %>.min.js`.<% } %>

<% if (props.twig) { %>#### *Twig files*
The twig file is located at the `./<%= folders.src %>/twig/<%= props.name %>.html.twig`.<% } %>

## Usage
to be written

## License
MIT © [Trowel](trowel.github.io)
