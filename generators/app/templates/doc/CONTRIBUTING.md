# Contributing

## Tools & Workflow

The workflow to test into a browser the component is setted with gulp<% if (props.javascript) { %> (and webpack for the javascript part)<% } %>.

All the files versionned for live testing are written `./<%= folders.test %>/<%= folders.src %>` folder.
The gulp workflow will generate, from those files, a `./<%= folders.test %>/<%= folders.dest %>` used by a local server (running via gulp) to renderer into your browser the component.

You have several commands for making the `./<%= folders.test %>/<%= folders.dest %>` folder :

```sh
# run gulp tasks to build the `./<%= folders.test %>/<%= folders.dest %>` folder
npm run test

# run gulp tasks to build the `./<%= folders.test %>/<%= folders.dest %>` folder in watch mode, and setup a localserver with livereload
npm start
```

Thoses commands generates css for the `./<%= folders.test %>` folder and for the `./<%= folders.dest %>` folder (in normal and minified version).


<% if (props.javascript) { %>
### Javascript
Javascript is transpiled and packaged with webpack. The workflow setuped here allow us to generate a script file browser-friendly into the `./<%= folders.dest %>/javascript` folder from a es2015 friendly (ready to be included in packaged workflows) script located at `./<%= folders.src %>/javascript`.

Here are the two commands for working with the javascript :

```sh
# builds the browser-friendly javascript file
npm run build-javascript

# builds the browser-friendly javascript file in watch mode
npm run build-javascript-dev
```

Thoses commands generates javascript for the `./<%= folders.test %>` folder and for the `./<%= folders.dest %>` folder (in normal and minified version).


<% } %>
## Writing a Trowel Component
[Checkout the documentation](https://github.com/Trowel/Trowel/blob/master/doc/3-create-your-own-trowel-component.md) from the trowel-core project, to learn about how writting a Trowel Component

## Good practices
To be written
