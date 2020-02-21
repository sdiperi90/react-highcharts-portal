import {createStore, applyMiddleware, compose} from "redux" // applyMiddlware to combine multiple middllewares
import thunk from "redux-thunk"
import {logger} from "redux-logger"
import reducers from "../reducers/reducers"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, logger]
const initialState = {}  
const HighchartsStore = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)))

export default HighchartsStore