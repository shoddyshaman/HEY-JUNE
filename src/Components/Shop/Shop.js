import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setProducts } from "../../Redux/productReducer";
import { setBag } from "../../Redux/bagReducer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = (props) => {
  const { products, setProducts, setBag } = props;
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [setProducts]);

  const handleAddToBag = (product) => {
    axios
      .post("/api/bag/add", {
        product_id: product.product_id,
        size: size,
        quantity: quantity,
      })
      .then((res) => {
        setBag(res.data);
        alert("Product added to bag");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="shop-main">
      <h4>We Hope you have a great shopping experience!</h4>
      <div className="shop-main-window">
        {products.map((product, index) => (
          <div key={product.product_id} className="shop-product">
            <Link to={`/product/${product.product_id}`}>
              <img src={product.product_img} alt={product.product_name} />
              <p>{product.product_name}</p>
            </Link>
            <p>${product.price}</p>
            <aside>{product.description}</aside>
            <select name="size" onChange={(e) => setSize(e.target.value)}>
              <option defaultValue value="">
                Please select a size
              </option>
              <option value="1T">1T</option>
              <option value="2T">2T</option>
              <option value="3T">3T</option>
              <option value="4T">4T</option>
            </select>
            <br />
            <input
              type="number"
              min="1"
              name="quantity"
              placeholder="Please Select Qty"
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={() => handleAddToBag(product)}>Add</button>
          </div>
        ))}
      </div>
    </main>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    products: reduxState.productReducer.products,
    bag: reduxState.bagReducer.bag,
  };
};

export default connect(mapStateToProps, { setBag, setProducts })(Shop);
