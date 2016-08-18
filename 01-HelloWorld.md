**Step #1**:  Create repository on github  
**Step #2**:  Clone repository to local computer (to work and reupload)  
```sh
$ git clone https://github.com/ravi221/rkProfile.git
```

**Step #3**:  Make some changes on the code  
Changes as of now:  
- README.md changed
- LICENCE file created
- 01-HelloWorld.md created



Open gitbash from windows start menu  

**git commands**:
```sh
$ cd rkProfile
# to check the status of file changes
$ git status  

# to set global information for git
$ git config --global user.email "mrravi221@gmail.com"
$ git config --global user.name "Ravi K"

# add files for commit
$ git add LICENCE 01-HelloWorld.md



# commit changes
$ git commit -a -m "LICENCE File created"


# push changes to main repository
$ git push

```


# Create basic Angular 2 page

To create Angular 2 page, we need its tools and packages So,   
Add the following package definition and configuration files to the project folder:

**package.json** : lists packages the QuickStart app depends on and defines some useful scripts.  
**tsconfig.json**:  is the TypeScript compiler configuration file.  
**typings.json**:  identifies TypeScript definition files.  
**systemjs.config.js** : is the SystemJS configuration file.

## Install packages
Run the following command in the comand line
```sh 
$ npm install
```

## Our first Angular component
Let's create a folder to hold our application and add a super-simple Angular component.  
Create an app subfolder off the project root directory:

```sh
$ mkdir app
```

Create component file  
**File: app/app.component.ts**:
```javascript
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent { }
```
Create module file  
**File: app/app.module.ts**:
```javascript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';=
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Create main entry file  
**File: app/main.ts**:
```javascript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
```

Create index.html to browser
**File: index.html**:
```html
<html>
  <head>
    <title>Angular 2 QuickStart</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 1. Load libraries -->
     <!-- Polyfill(s) for older browsers -->
    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
  </head>
  <!-- 3. Display the application -->
  <body>
    <my-app>Loading...</my-app>
  </body>
</html>
```

## Run lite-server
To see the result we could use lite-server instead of Apache., etc
```sh
$ npm start
```


## Upload changes to git

Create ignore files list in .gitignore file.  
**File: .gitignore**:  
```text
node_modules
typings
*.map
app/*.js
.gitignore
```

## At this poing we can commit and push changes to git