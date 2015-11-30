Knowledge checklist

This application is supposed to help keep tracking the users' knowledge progress. 

## Development

To start developing the project:

1. Read and do all the steps from the README in server part of the project 

2. Clone the client part of the project from here:

    `https://github.com/IteraStb/kpc-client.git`

3. Install npm modules:
    bash
    `npm install`

4. Install bower modules:
    `bash`
    `bower install`

5. Run the server using:

    gulp task

    `bash
    gulp serve`

    or npm command

    `bash
    npm run webserver`

The `serve` tasks starts a static file server, which serves the AngularJS application, and a watch task which watches all files for changes and lints, builds and injects them into the index.html accordingly.

This should redirect you the `http://localhost:8000` 

add `/index.html` to go to the application start page

## Tests

To run tests run:

```bash
gulp test
```

**Or** first inject all test files into `karma.conf.js` with:

```bash
gulp karma-conf
```

Then you're able to run Karma directly. Example:

```bash
karma start --single-run
```

## Production ready build - a.k.a. dist

To make the app ready for deploy to production run:

```bash
gulp dist
```

Now there's a `./dist` folder with all scripts and stylesheets concatenated and minified, also third party libraries installed with bower will be concatenated and minified into `vendors.min.js` and `vendors.min.css` respectively.
