// Core
import { routerMiddleware } from "connected-react-router";
import { compose, Middleware } from "redux";
import createSagaMiddleware from "redux-saga";
import history from "./history";

const DEV = process.env.NODE_ENV === "development";

const sagaMiddleware = createSagaMiddleware();
const devtools = window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = DEV && devtools ? devtools : compose;

const middleware: Middleware[] = [routerMiddleware(history), sagaMiddleware];

export { composeEnhancers, middleware, sagaMiddleware };
