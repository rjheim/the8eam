# The8eam

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##Instructions for Running
 
In order to run our application as it is tested, we recommend following these steps to replicate our development environment. 
// (sudo) --> for linux/mac  //
1. Install Node - 6.11.4
	[Download](https://nodejs.org/dist/latest-v6.x/) 
	Optional: If you have multiple node projects you can use Node Version Manager (NVM) Install:https://github.com/creationix/
2. Install Npm - 5.5.1 
	'(sudo) npm uninstall npm -g'
	A version of npm comes when you install Node, if it is less than 5.5.1, run:
	'npm install npm@latest -g'
	Navigate into the directory of the repository that contains package.json and use 'npm install' to install all node dependencies.
 
3. Install angular/cli - 1.4.7 
	(sudo) npm install -g @angular/cli
	You can install the latest version of angular, and our repository's packages.json file will specify the correct version to use automatically.

4. Run 'npm install' in App's root folder (this directory should have 'src' folder in it).

5. Run ng serve. 
	You can then open up a web browser and navigate to http://localhost:4200/.
