import addContext from 'mochawesome/addContext';
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

const titleToFileName = (title) => title.replace(/[:\/]/g, '');

let logHistory = [];

Cypress.on('window:before:load', (win) => {
    let originalFn = {};

    ['warn', 'error', 'log', 'info'].forEach((method) => {
        originalFn[method] = win.console[method];
        
        win.console[method] = (...args) => {
            logHistory.push(`${method}: ${args}`)
            originalFn[method](...args);
        }
    });
});

Cypress.on('test:after:run', (test, runnable) => {
    addContext({test}, {
        title: 'Browser',
        value: `${Cypress.browser.displayName} (${Cypress.browser.version}) (${Cypress.platform})`
    });

    if (test.state === 'failed') {
        const filename = `${titleToFileName(runnable.parent.title)} -- ${titleToFileName(test.title)} (failed).png`;
        
        addContext({ test }, {
            title: 'Screenshot:',
            value: `../screenshots/${Cypress.spec.name}/${filename}`
        });

        addContext({ test }, {
            title: 'Log History:',
            value: logHistory.join('\n')
        });

        // Cypress can only handle "full videos" right now we dont want this - but maybe in future
        // see open related issue: https://github.com/cypress-io/cypress/issues/2522
        // addContext({ test }, {
        //     title: 'Video:',
        //     value: `../videos/${Cypress.spec.name}.mp4`
        // });

        logHistory = [];
    }
});

