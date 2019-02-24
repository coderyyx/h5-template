import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from "react-router-dom";
import PageWarp from 'toolComponents';
import App from './app';
import LessonDetails from './page/lessonDetails';
import Register from './page/minePage/register';

export default () => <HashRouter>
    <PageWarp>
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/lessonDetails" component={LessonDetails}/>
            <Route path="/register" component={Register}/>
        </Switch>
  </PageWarp>
</HashRouter>