if (module.hot) {
  module.hot.accept();
}
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';


import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducer from './reducers/index.jsx';


const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    reducer,
    router: routerReducer
  }),
  // 实际环境要 注释
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(middleware),
)




import App from './components/App';
import Index from './components/Index';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import Stage4 from './components/Stage4';
import Stage5 from './components/Stage5';
import Stage6 from './components/Stage6';
import room from './components/room';
import customer from './components/customer';
import Stage7 from './components/Stage7';
import Result from './components/Result';

import './index.less';



ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/index" component={Index} />
          <Route path="s1" component={Stage1} />
          <Route path="s2" component={Stage2} />
          <Route path="s3" component={Stage3} />
          <Route path="s4" component={Stage4} />
          <Route path="s5" component={Stage5} />
          <Route path="s6" component={Stage6} />
          <Route path="room" component={room} />
          <Route path="customer" component={customer} />
          <Route path="s7" component={Stage7} />
          <Route path="result" component={Result} />
        </Route>
      </Router>
    </ConnectedRouter>
  </Provider>
, document.getElementById('main'));
