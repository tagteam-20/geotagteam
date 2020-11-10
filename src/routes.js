import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Gem from './Components/Gem/Gem';
import Map from './Components/Map/Map';
import User from './Components/User/User';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/gem/:id' component={Gem} />
        <Route path='/map' component={Map} />
        <Route path='/user' component={User}/>
    </Switch>
)