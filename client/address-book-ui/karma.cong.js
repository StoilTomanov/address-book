module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-junit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        reporters: ['progress', 'kjhtml', 'junit'],
        junitReporter: {
            outputDir: 'test-results',
            outputFile: 'test-results.xml',
            useBrowserName: false,
        },
    });
};
