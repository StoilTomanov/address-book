module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-json-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        reporters: ['progress', 'kjhtml', 'json'],
        jsonReporter: {
            stdout: false,
            outputFile: 'test-results.json',
        },
        browsers: ['ChromeHeadless'],
        singleRun: true,
    });
};
