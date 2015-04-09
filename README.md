# Node CLI Tool Introduction

Tools like Make, Gulp, Grunt, Rake, etc. are great for scripting many of the
tedious tasks we do as developers on a daily basis. However, they can be heavy
handed and ceremonious for many things you will actually need on some projects.
When you do find the need to break out a new CLI tool JavaScript is a powerful
language to use to make that happen. Since JavaScript has quickly become a must
have language for most developers to learn, it's likely that developers from
many different technology stacks will be able to jump in and contribute. With
that said though JavaScript in its ES5 form today can itself be rather
ceremonious and a barrier to adoption. I aim to demonstrate how to setup a
NodeJS Cli tool with the next generation of JavaScript and compiling that down
to ES5 or whatever version is currently supported.

## Goals

- __OS Agnostic__ - CLI tools should work on any OS.
- __ES6 -> Next Gen JavaScript__ - Using tools like [Babel](http://babeljs.io/)
  to write your scripts and deploy compiled scripts.
- __Asyncronous__ - Non-blocking disk IO and network requests, or potential
  process forking.
- __Extensibility__ - The CLI tool code should also double as a node module
  library, whenever possible.
- __Testable__ - Test coverage is a first class citizen to developing your CLI
  tool.
- __Documentation__ - Enable others to use what you wrote

## The Project

Create a NodeJS CLI tool to release a project. The release process should:

- Version Bump following [SemVer](http://semver.org/) guidelines
  - Modifies the package.json file's version field
  - Commits the changed file to source control
- Build the src
  - Remove old compiled code to ensure nothing old sticks around
- Git tag the src repo, and push the tags to the remote origin repo
- Document the release using the [GitHub release
  api](https://developer.github.com/v3/repos/releases/)

### Resources to consider

- [npm](https://docs.npmjs.com/)
  - [npm scripts](https://docs.npmjs.com/misc/scripts)
  - [package.json](https://docs.npmjs.com/files/package.json)
- [Babel](http://babeljs.io/)
- Command line parsers
  - [yargs](https://www.npmjs.com/package/yargs)
  - [commander](https://www.npmjs.com/package/commander)
- [Mocha](http://mochajs.org/)
- [Chai](http://chaijs.com/)
- [chai-as-promised](https://www.npmjs.com/package/chai-as-promised)
- [fs](https://nodejs.org/api/fs.html)
- [fs-promise](https://www.npmjs.com/package/fs-promise)
- [child-process-promise](https://www.npmjs.com/package/child-process-promise)
- [path](https://nodejs.org/api/path.html)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [mkdirp](https://www.npmjs.com/package/mkdirp)
- [gh-release](https://www.npmjs.com/package/gh-release)
- [shell scripting node](http://shapeshed.com/command-line-utilities-with-nodejs/)
- [EditorConfig](http://editorconfig.org/)
- [ESLint](http://eslint.org/)

### Suggested project layout

```
/path/to/project
├─┬ bin
│ └── (shell scripts that invoke modules in lib, there should not be too much code here)
├─┬ lib (ignored from source control)
│ └── (compiled js files)
├─┬ node_modules (ignored from source control)
│ └── (npm dependencies install here by default)
├─┬ src
│ └── (source es6 js files)
├─┬ test
│ ├── mocha.opts (if you are using mocha)
│ └── (unit tests)
├── .eslintrc
├── .editorconfig
├── .gitignore
└── package.json
```
