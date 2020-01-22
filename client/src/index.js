import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from "react-redux";

import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './styles/main.scss';
// import { store } from "./store";

import reducer from './reducers';
import HomeContainer from './containers/app';

const store = createStore(reducer, applyMiddleware(thunk));



ReactDOM.render(
    <Provider store={store}>
        <HomeContainer />   
    </Provider>
, document.getElementById('root'));