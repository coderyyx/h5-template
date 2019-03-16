import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import PageWarp from 'toolComponents';
import dynamic from 'utils/dynamic';

const routeConfig = [
    {
        path: '/',
        component: () => import('./app')
    },
    {
        path: '/lessonDetails',
        component: () => import('./page/lessonDetails')
    },
    {
        path: '/register',
        component: () => import('./page/minePage/register')
    }
]
export default () => <BrowserRouter>
    <PageWarp>
        <Switch>
            {
                routeConfig.map(({path, component}) => <Route path = {path} key={path} exact = {path === '/'} component = {dynamic({component})}/>)
            }
        </Switch>
  </PageWarp>
</BrowserRouter>