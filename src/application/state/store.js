import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import * as reducers from "./module";
import mySaga from "./module/map/operations";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(reducers);

export default createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga);