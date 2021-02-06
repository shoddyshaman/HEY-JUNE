import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {setProduct} from '../../Redux/productReducer';
import { useEffect } from 'react';
import './Product.css';

const Product = (props) => {
    const {product, setProduct} = props;
    const { product_id } = props.match.params

    // console.log(props) 
    useEffect(() => {
        axios.get(`/api/product/${product_id}`)
          .then((res) => {
            setProduct(res.data)
          })
          .catch(err => console.log(err))
      }, [setProduct,product_id])

    
    return (
        <main className="shop-product-container">
            <img className="product-image" src={product.product_img} alt={product.product_name}/>
            <div className="product-description">
                <p>{product.product_name}</p>
                <p>${product.price}</p>
                <p>{product.description}</p>
            </div>
        </main>
    )

}

const mapStateToProps = reduxState => {
    return {
        product: reduxState.productReducer.product
    }
}

export default connect(mapStateToProps,{setProduct})(Product);