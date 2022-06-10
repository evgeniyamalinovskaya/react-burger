import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App/App';
import reportWebVitals from './reportWebVitals';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/index';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// Инициализируем хранилище с помощью корневого редьюсера
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
    // Оборачиваем приложение компонентом Provider из пакета react-redux
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
