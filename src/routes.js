import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Shop from './Components/Shop/Shop';
import Product from './Components/Product/Product';
// import Checkout from './Components/Checkout/Checkout';
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import Contact from './Components/Contact/Contact';
import Bag from './Components/Bag/Bag';
import AddProduct from './Components/Api/AddProduct';
import Invoice from './Components/Invoice/Invoice';


export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/home" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/product/:product_id" component={Product}/>
        <Route path="/invoice" component={Invoice}/>
        <Route path="/aboutUs" component={AboutUs}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/bag" component={Bag}/>
        <Route path="/api/add-product" component={AddProduct}/>
    </Switch>
)