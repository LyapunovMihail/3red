import 'zone.js/dist/zone-node';

import * as express from 'express';
import * as fs from 'fs';
const domino = require('domino');
import { join } from 'path';
import 'localstorage-polyfill';
import { bootstrap } from './serv-files/serv-modules/main-server';
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist', 'desktop');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModule, ngExpressEngine} = require('./src/main.server');

const templateA = fs.readFileSync(join(DIST_FOLDER, 'index.html')).toString();
const win = domino.createWindow(templateA);
win.Object = Object;
win.Math = Math;
const glob1 = global as any;
glob1.window = win;
glob1.document = win.document;
glob1.branch = null;
glob1.object = win.object;
glob1.HTMLElement = win.HTMLElement;
glob1.navigator = win.navigator;
glob1.localStorage = localStorage;
glob1.sessionStorage = localStorage;

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

function run(): void {
    bootstrap(app).then((serv) => {
        serv.listen(PORT);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
