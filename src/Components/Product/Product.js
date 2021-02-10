import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setProduct } from "../../Redux/productReducer";
import { setBag } from '../../Redux/bagReducer'
import { useState, useEffect } from "react";
import "./Product.css";

const Product = (props) => {
  console.log(props);
  const { product, setProduct } = props;
  const { product_id } = props.match.params;
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // console.log(props)
  useEffect(() => {
    axios
      .get(`/api/product/${product_id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [setProduct, product_id]);

  const handleAddToBag = (product) => {
    axios.post('/api/bag/add',{product_id:product.product_id,size:size,quantity:quantity})
    .then(res => {
        setBag(res.data)
        alert('Product added to bag')
    })
    .catch(err => console.log('hey im here too'))
}

  return (
    <main className="product-container">
      <img
        className="product-image"
        src={product.product_img}
        alt={product.product_name}
      />
      <div className="product-description">
        <p>{product.product_name}</p>
        <p>${product.price}</p>
        <span>{product.description}</span>
        <select name="size" onChange={(e) => setSize(e.target.value)}>
          <option defaultValue value="">
            Please select a size
          </option>
          <option value="1T">1T</option>
          <option value="2T">2T</option>
          <option value="3T">3T</option>
          <option value="4T">4T</option>
        </select>
        <input
          type="number"
          min="1"
          name="quantity"
          placeholder="Please Select Qty"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={() => handleAddToBag(product)}>Add</button>
      </div>
    </main>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    product: reduxState.productReducer.product,
    bag: reduxState.bagReducer.bag
  };
};

export default connect(mapStateToProps, { setBag,setProduct })(Product);
