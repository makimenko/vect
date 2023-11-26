# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
