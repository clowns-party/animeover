// core
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// instruments
import { store } from "./init/store";
import history from "./init/history";
import { SignUpForm } from './Elements/signUpForm/signUpForm';
import { HomePage } from "./Elements/HomePage/HomePage";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/signIn" render={() => <App />} />
            <Route exact path="/signUp" render={() => <SignUpForm />} />
            <Route exact path="/test2" render={() => <div>some</div>} />
            <Route exact path="/test2/:id" render={() => <div>some</div>} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
