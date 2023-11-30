# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.5](https://github.com/makimenko/vect/compare/v0.0.4...v0.0.5) (2023-11-30)


### Bug Fixes

* dynamic script loader ([1ef039b](https://github.com/makimenko/vect/commit/1ef039bff9570296d9946eb0d7da4b113f697caa))
* githug pages routing (refresh issue) ([8a7faa4](https://github.com/makimenko/vect/commit/8a7faa41fac0f4eee7fdcf46b9769cc9c4b160b9))
* gitignore ([5cd7b42](https://github.com/makimenko/vect/commit/5cd7b426a6f730faee9c9b148df4a5da6080dfaa))
* keep route on refresh (fetch auth info in login guard) ([66a0130](https://github.com/makimenko/vect/commit/66a0130ab1ae75ff8eb8dcc88c1bf73092cac304))
* login animation ([3b63e58](https://github.com/makimenko/vect/commit/3b63e58bbee42ffc9100884b4589a0510225851c))
* logout feature ([0639e84](https://github.com/makimenko/vect/commit/0639e84ce50fa5ca44e9c84ae753872c0a1765f1))
* persist sidenav state ([ee85622](https://github.com/makimenko/vect/commit/ee85622b6c066b38a8cfe298dd35eb6bfebd4277))
* polish resize and warnings ([fe16fe3](https://github.com/makimenko/vect/commit/fe16fe3f7457f9524aecdc44de6fca036e94d56c))
* store access token ([cd4a01b](https://github.com/makimenko/vect/commit/cd4a01be68bb9b33707f26c962a67c5fe3b45f0f))
* switch to latest version of threejs lights ([31ce3cc](https://github.com/makimenko/vect/commit/31ce3cc55121cb8a75cabf6ae1fde308d5eba2bc))
* UI polishing (title in toolbar, disable sidenav close by ESC, help css) ([a3110f5](https://github.com/makimenko/vect/commit/a3110f59724a28ca3834238da047ac2df50cd38b))

### [0.0.4](https://github.com/makimenko/vect/compare/v0.0.3...v0.0.4) (2023-11-26)


### Features

* reanimate vect project (Angular 16, threejs 0.158.0, atft 1.5.2) ([c9d8d57](https://github.com/makimenko/vect/commit/c9d8d57e0001cb0d88f00fff1fc0ac93c2b510ac))


### Bug Fixes
* fix upgrade ([14ffef7](https://github.com/makimenko/vect/commit/14ffef79f81c6f77d72f9ead3d58e7754205187d))
* upgrade atft:1.5.0, threejs:0.131.3 ([51f7085](https://github.com/makimenko/vect/commit/51f70855bcb4255a3ebea3af6929bd93ef1115f4))
* upgrade to atft 1.5.2 ([6e7cbfa](https://github.com/makimenko/vect/commit/6e7cbfa773d0c56aad71d45c4085554359fcb3ec))
* environment configuration ([a072392](https://github.com/makimenko/vect/commit/a072392fe194a871b29c165e42c4fc56db2358d7))
* resolve issue with SCSS flex layout ([e7beeec](https://github.com/makimenko/vect/commit/e7beeec8d2d365a66513ae1c69e163afcdb2e4ee))
* SCSS flex layout issues ([93ce5c5](https://github.com/makimenko/vect/commit/93ce5c59b830cde4c49b824b70ddb61fbac76ec8))
* side navigator textarea bug ([fd2843b](https://github.com/makimenko/vect/commit/fd2843b90e1c429c69d97dd48eae6a1c9d33f949))

### [0.0.3](https://github.com/makimenko/vect/compare/0.0.2...v0.0.3) (2021-05-06)
* new node type: model (custom 3D model)
* Upgraded atft:1.4.23
* Upgraded three:0.128.0
* Switched to standard-version

### [0.0.2](https://github.com/makimenko/vect/compare/0.0.1...0.0.2) (2021-03-07)

* New actor (node type: workstation)
* New actor (node type: user)
* Possibility to customize edge color and types: association | message | line | sequence
* Various improvements in [atft](https://github.com/makimenko/angular-template-for-threejs/pull/353) library (switched to 1.4.13)

### 0.0.1 (2021-02-23)

* Initial release with a basic functionality:
  * Integration with atft, google api v3
  * Angular material design
  * CI/CD pipeline as GitHub action
  * Manager: list of diagrams, possibility to create and delete diagram
  * Template manager (sample diagram template)
  * Editor: yaml parsing, atft data center components
  * Persistence: read/write/delete files on personal Google drive
