import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {setProducts} from '../../Redux/productReducer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';


const Shop = (props) => {
    const { products, setProducts } = props;
    
    useEffect(() => {
        axios.get('/api/products')
        .then(res =>{
            setProducts(res.data)
        })
        .catch(err => console.log(err))
    },[setProducts])
    
    return (
        <main className="shop-main">  
        <h4>We Hope you have a great shopping experience!</h4>
        <div className="shop-main-window">
            {products.map((product, index) => 
                <Link to={`/product/${product.product_id}`}><div key={product.product_id} className="shop-product">
                    <img src={product.product_img} alt={product.product_name}/>
                    <p>{product.product_name}</p>
                    <p>${product.price}</p>
                    <aside>{product.description}</aside>
                </div></Link>
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

export default connect(mapStateToProps,{setProducts})(Shop);