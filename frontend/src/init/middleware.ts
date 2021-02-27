// Core
import { compose, Middleware } from "redux";
import createSagaMiddleware from "redux-saga";

const DEV = process.env.NODE_ENV === "development";

const sagaMiddleware = createSagaMiddleware();
const devtools = window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = DEV && devtools ? devtools : compose;

const middleware: Middleware[] = [sagaMiddleware];

export { composeEnhancers, middleware, sagaMiddleware };
