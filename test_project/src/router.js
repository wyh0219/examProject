import React from 'react';
import { Router, Redirect } from 'dva/router';
import MapRoute from './routerConfig/routerEnter'
import routes from './routerConfig/index'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
       <MapRoute routes={routes.routes}>
        <Redirect from="/" to="/login" exact></Redirect>
       </MapRoute>
    </Router>
  );
}

export default RouterConfig;
