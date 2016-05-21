## Structure to generate
```
.
├── src/
│   ├── scss/
│   │   └── pod.scss
│   ├── twig/
│   │   └── pod.html.twig // if twig enabled
│   └── javascript/
│       └── pod.js // if javascript enabled
├── dest/
│   ├── css/
│   │   └── pod.min.css
│   └── javascript/
│       └── pod.min.js // if javascript enabled
├── test/
│   ├── bower_components/
│   │   └── …
│   ├── index.html.twig
│   └── style.scss
├── .bowerrc
├── .editorconfig
├── .gitignore
├── .scss-lint.yml
├── .jshintrc.yml
├── LICENSE
├── README.md
├── bower.json
├── gulpfile.js
├── injector.json
└── package.json
```

## Roadmap
* Classic generation
* Subgenerator of sass partial
* Subgenerator of js file
