# Nebula

_Shared components library with sandbox_

## working on components

`npm run sandbox` will bring up sandbox, with hot reload enabled. You can work on components individually and don't worry about styles conflicts.

Thanks to lerna, you don't have to solve dependencies between components. If ComponentA uses ComponentB from Nebula, just add a ComponentB into `dependencies` of package.json of the ComponentA.

## linking Nebula locally, without publishing

When working on a project like CCM or MSC, you might want to do some extra tuning of a component, even after it's been ok in sandbox. It would be complicated to go through Nebula publishing and project updating after each change of component. It is possible to use `file://` prefix in package.json to link to the package source on local environment.

To use Nebula from a project, you can temporarily change the package.json of CCM/MSC to something like this:

`'nebula': 'file:../../nebula_folder'` where `../../nebula_folder` is a relative path to your Nebula repository clone.

It is still necessary to run `npm run build` from Nebula, after you're done with sandbox work. But you don't have to run `npm install` from project's folder.

## building and publishing

We follow Pull Request with reviews, so that all your work should happen on branch).

When you're done with your work or changes on a component, stay on your branch and run following commands.

If all is well, you should be prompted for a new version of Nebula package, under which it would be available. Consider your changes scope and effects on other developers and projects, and decide whether Minor, Major or Release version should be increased.

```
# make sure your local copy is clean
npm run build
git add dist && git commit -m "build"
# edit package.json and update the version to what you want to get to (eg. 0.1.2)
commit the change
npm run publish # enter the same version - 0.1.2
git push
git push origin v0.1.2
```

Lerna created a tag, which you need to push to github, along with all the commits. From that moment, users can refer to that tag to include lerna build in projects.

## including Nebula from a project

Install the package
```
npm install --save git+https://cto-github.cisco.com:rdambors/nebula.git
```

Add styles (depending on project configuration)
```
// in js
import from 'nebula/dist/nebula.css';
// or in scss
@import '/node_modules/nebula/dist/nebula.css';
```

Update webpack loaders to exclude Nebula styles from hashing
```
{ test: /(\.css)$/, include: [/nebula/], loaders: ['style', 'css'] },
{ test: /(\.css|\.scss)$/, exclude: [/nebula/], loaders: ['style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass?sourceMap'] },
```

Use components
```
import { Toggle } from 'nebula';
```
