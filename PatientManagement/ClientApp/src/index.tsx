//import 'bootstrap/dist/css/bootstrap.css';
//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
//const rootElement = document.getElementById('root');

//ReactDOM.render(
//    <BrowserRouter basename={baseUrl}>
//        <App history={undefined} />
//  </BrowserRouter>,
//  rootElement);

//registerServiceWorker();
import './css/site.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';
let routes = RoutesModule.routes;

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    const rootElement = document.getElementById('root');
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={routes} basename={baseUrl} />
        </AppContainer>,
        rootElement
    );
}

renderApp();

// Allow Hot Module Replacement
//if (module.hot) {
//    module.hot.accept('./routes', () => {
//        routes = require<typeof RoutesModule>('./routes').routes;
//        renderApp();
//    });
//}

