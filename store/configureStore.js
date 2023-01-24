import { createWrapper } from 'next-redux-wrapper';
import { compose, applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';


import reducer from '../reducers';
import rootSaga from '../saga';

// const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
//     //console.log("loggerMiddleware : ", action);
//     return next(action);
// };


const configureSotre = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares));

    // const store = createStore(reducer, enhancer);
    const store = createStore(reducer, enhancer);

    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

const wrapper = createWrapper(configureSotre, {
    debug: process.env.NODE_ENV === 'development,'
});

export default wrapper;


// import Reducer from './_reducers';
// import { applyMiddleware, legacy_createStore as createStore } from 'redux';
// import promiseMiddleware from 'redux-promise';
// import ReduxThunk from 'redux-thunk';
// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// createStoreWithMiddleware(Reducer, devTools)

