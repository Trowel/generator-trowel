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
├── styleguide/
│   ├── styleguide.html.twig // ok
│   └── styleguide.scss // ok
├── .bowerrc // ok
├── .editorconfig // ok
├── .gitignore // ok
├── .scss-lint.yml // ok
├── .jshintrc.yml // ok
├── LICENSE // ok
├── README.md // ok
├── bower.json // ok
├── gulpfile.js
├── injector.json // ok
└── package.json // ok
```

## Roadmap
* Classic generation
* Subgenerator of sass partial
* Subgenerator of js file
