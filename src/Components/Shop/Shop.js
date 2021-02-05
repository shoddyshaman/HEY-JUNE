import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {setProduct} from '../../Redux/productReducer'
import { useState, useEffect } from 'react';
import './Shop.css';


const Shop = (props) => {
    const { products, setProduct } = props;
    
    useEffect(() => {
        axios.get('/api/products')
        .then(res =>{
            setProduct(res.data)
        })
        .catch(err => console.log(err))
    },[setProduct])
    
    return (
        <main className="shop-main">  
        <h4>We Hope you have a great shopping experience!</h4>
        <div className="shop-main-window">
            {products.map((product, index) => 
                <div key={product.product_id} className="shop-product">
                    <img src={product.product_img} alt={product.product_name}/>
                    <p>{product.product_name}</p>
                    <p>${product.price}</p>
                    <aside>{product.description}</aside>
                </div>
            )}
        </div>
        </main>
    )
}

const mapStateToProps = reduxState => {
    return {
        products: reduxState.productReducer.products
    }
}

export default connect(mapStateToProps,{setProduct})(Shop);