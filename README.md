# HTML Starter Kit

Version: 1.0.0

## Author:

- Thanh Hoang
- Thuan Nguyen

## Contributor:

Anyone and everyone is welcome to contribute!
Please feel free to fork this repository and send us a pull request.

## Summary

HTML Starter Kit is used as a starting template to build a static page, using modern front-end stack such as SASS, JQuery, Bower for dependencies management, Gulp to process all tasks and BrowserSync to sync any changes across local development devices.

## Usage

The starter kit is set up to use [Gulp](http://gruntjs.com/) to compile SCSS (with source maps). Gulp run the compiled stylesheet through [AutoPrefixer](https://github.com/ai/autoprefixer), lint, concatenate and minify JavaScript (with source maps), optimize images with flexibility to add any additional tasks via the Gulpfile.

- Install dependencies by running `bower install`
- Install package by running `npm install` (maybe require `sudo npm install`)
- Edit your theme information in `src/scss/_config.scss`
- Change your theme folder name in `gulpfile.js`
- Using gulp to execute tasks by running `gulp`

### Deployment

- Run `gulp build` to build the final product

###  Library Embed

- Search on [Bower Library](http://bower.io/search/)
- Install library by running `bower install *library_name* --save-dev`
- For other JS library, please copy to `app/js/lib` folder

### Features

1. Normalized stylesheet for cross-browser compatibility using Normalize.css version 3 (IE8+)
2. Easy to customize
3. Gulp for processing all SASS, JavaScript and images, and cross-device refreshing with BrowserSync
4. Flexible grid like Bootstrap
5. Media Queries can be nested in each selector using SASS
6. SCSS with plenty of mixins ready to go

### Credits

Without these projects, this HTML Starter Kit wouldn't be where it is today.

* [Normalize.css](http://necolas.github.com/normalize.css)
* [SASS / SCSS](http://sass-lang.com/)
* [AutoPrefixer](https://github.com/ai/autoprefixer)
* [BrowserSync](https://github.com/shakyShane/browser-sync)
* [Gulp](http://gulpjs.com)