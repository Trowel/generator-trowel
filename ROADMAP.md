## Structure to generate
```
.
├── src/
│   ├── scss/ // ok
│   │   └── pod.scss // ok
│   ├── twig/
│   │   └── pod.html.twig // ok
│   └── javascript/
│       └── pod.js // ok
├── dest/
│   ├── css/
│   │   ├── pod.css
│   │   └── pod.min.css
│   └── javascript/
│       ├── pod.js // if javascript enabled
│       └── pod.min.js // if javascript enabled
├── test/
│   ├── bower_components/
│   │   └── …
│   ├── index.html.twig // ok
│   └── style.scss // ok
├── gui/
│   ├── gui.html.twig // ok
│   └── gui.scss // ok
├── .bowerrc
├── .editorconfig
├── .gitignore
├── .scss-lint.yml // ok
├── .jshintrc.yml // ok
├── LICENSE // ok
├── README.md
├── bower.json
├── gulpfile.js
├── injector.json // ok
└── package.json
```

## Roadmap
* Classic generation
* Subgenerator of sass partial
* Subgenerator of js file
