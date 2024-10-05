/* eslint-disable */

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('karma-jasmine-html-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        reporters: ['progress', 'kjhtml', 'coverage'],
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage/address-book-ui'),
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'json-summary' }],
        },
        browsers: ['Chrome'],
        singleRun: false,
    });
};
