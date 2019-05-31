import React from 'react';
import { Route,Switch } from 'dva/router'

const MapRoute=(props)=>(
  <Switch>
    {props.children}
    {props.routes?props.routes.map((route,index)=>(
      <Route
      key={index}
      path={route.path}
      render={()=><route.component routes={route.children} />}></Route>
    )):null}
  </Switch>
)

export default MapRoute;