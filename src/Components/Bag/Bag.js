import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { setBag } from "../../Redux/bagReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BagItem from "./BagItem";
import "./Bag.css";

const Bag = (props) => {
  const { bag, setBag } = props;

  useEffect(() => {
    axios
      .get("/api/bag")
      .then((response) => {
        setBag(response.data);
      })
      .catch((err) => console.log(err));
  }, [setBag]);
  console.log(bag);
  return (
    <div className="container-bag">
      <h1>Your Bag</h1>
      {bag?.map((item, index) => {
        return <BagItem key={item.product_id} item={item} setBag={setBag} />;
      })}
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    bag: reduxState.bagReducer.bag,
  };
};

export default connect(mapStateToProps, { setBag })(Bag);
