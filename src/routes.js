import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Shop from './Components/Shop/Shop';
import Product from './Components/Product/Product';
import Checkout from './Components/Checkout/Checkout';
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Contact from './Components/Contact/Contact';
import Bag from './Components/Bag/Bag';


export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/home" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/product/:id" component={Product}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/aboutUs" component={AboutUs}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/bag" component={Bag}/>
    </Switch>
)