import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { store } from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>,
    document.getElementById('root')
);

reportWebVitals();
