import { Switch, Route } from 'react-router-dom';
import React from 'react';

export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/home" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/product" component={Product}/>
        <Route path="/checkout" component={Checkout}/>
    </Switch>
)