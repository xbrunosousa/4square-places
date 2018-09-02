import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import store from './store/index';
import { addArticle } from './actions/index';
window.store = store;
window.addArticle = addArticle;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
