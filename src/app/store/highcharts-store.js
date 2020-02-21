import {createStore, applyMiddleware} from "redux" // applyMiddlware to combine multiple middllewares
import thunk from "redux-thunk"
import logger from "redux-logger"
import reducers from "../reducers/reducers"

const middlewares = [thunk, logger]
const initialState = {}  
const HighchartsStore = createStore(reducers, initialState, applyMiddleware(...middlewares))

export default HighchartsStore