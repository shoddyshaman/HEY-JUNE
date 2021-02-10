import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { setBag } from "../../Redux/bagReducer";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Bag.css";

const BagItem = (props) => {
  const { item, setBag } = props;
  const [quantity, setQuantity] = useState(item.quantity);
  const [size, setSize] = useState(item.size);
  const [isEditing, setIsEditing] = useState(false);
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    return () => {
      cancelTokenSource.cancel()
    }
  },[cancelTokenSource])

  const handleUpdate = (item) => {
    console.log(item)
    axios
      .put("/api/bag", { quantity: quantity, bag_item_id: item.bag_item_id,size: size, cancelToken: cancelTokenSource.token,bag_id: item.bag_id,product_id: item.product_id})
      .then((res) => {
        console.log(res.data)
        setBag(res.data);
        setIsEditing(false);
      })
      .catch((err) => alert(err.response.data));
  };

  return (
    <div className="bag-item">
      <img src={item.product_img} alt={item.product_name} />
      <div className="bag-desc">
        <h4>{item.product_name}</h4>
        {isEditing ? (
          <div className="item-desc">
            Update Quantity:{" "}
            <input
              placeholder={item.quantity}
              type="number"
              min="1"
              onChange={e => setQuantity(e.target.value)}
            />
            <br />
            Update Size:{" "}
            <select
              placeholder={item.size}
              onChange={e => setSize(e.target.value)}
            >
              <option defaultValue value="">
                {item.size}
              </option>
              <option value="1T">1T</option>
              <option value="2T">2T</option>
              <option value="3T">3T</option>
              <option value="4T">4T</option>
            </select>
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "rgba(0, 0, 255, .2)" }}
              startIcon={<SaveIcon />}
              onClick={() => handleUpdate(item)}
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="item-desc">
            <p>Quantity Selected: {item.quantity}</p>
            <br />
            <p>Size Selected: {item.size}</p>
            <br />
            <Button
              variant="outlined"
              color="primary"
              style={{ color: "white", backgroundColor: "rgba(0, 0, 255, .2)" }}
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </Button>
            <Button
            variant="contained"
            color="secondary"
            fontSize="10px"
            startIcon={<DeleteIcon />}>
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    bag: reduxState.bagReducer.bag,
  };
};

export default connect(mapStateToProps, { setBag })(BagItem);
