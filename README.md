# Stingray #

> Helper framework that has automation using [Gulp](http://gulpjs.com/) for the build process (compression, compilation and browser syncing) and working on my own SCSS framework.


### What is this repository for? ###

Speeding up prototyping and building of web applications, themes and general web awesomeness.


# Getting Started #

To get started download [Stingray](https://github.com/nilssanderson/stingray) with Git:
```
git clone https://github.com/nilssanderson/stingray.git
cd stingray
npm install
```

Then to build the framework:
```
gulp
```

The default task should:

* Convert SCSS to CSS
* Open these in the browser for syncing

Your finished site will be created in a folder called `build`, viewable at this URL: [http://localhost:3010](http://localhost:3010)

* Browsersync settings: [http://localhost:3020](http://localhost:3020)

To create compressed, production-ready assets, run:
```
gulp production
```