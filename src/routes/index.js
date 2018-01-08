import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import { connect } from 'dva';
import dynamic from 'dva/dynamic';

import Home from './Home/index';

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Route>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Route>
    </Router>
  );
}  

export default RouterConfig;
