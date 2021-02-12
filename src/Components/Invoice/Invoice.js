import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { setBag, clearBag } from "../../Redux/bagReducer";

const Invoice = (props) => {
  const { bag, setBag } = props;
  const [invoiceInfo, setInvoiceInfo] = useState([]);

  useEffect(() => {
    axios
      .get("/api/bag")
      .then((res) => {
        setBag(res.data);
        
      })
      .catch((err) => console.log(err));
  }, [setBag]);
  console.log(bag)

  useEffect(() => {
    if(bag[0]){
      axios
      .post("api/invoice", { bag, bag_id: bag[0].bag_id })
      .then((res) => {
        const invoice = res.data;
        setInvoiceInfo(invoice);
        axios.delete(`/api/bag/${bag[0].bag_id}`)
        .then((res) => {
          setBag(res.data)
        })
        .catch((err) => console.log(err));
       })
      .catch((err) => console.log(err));}
  }, [bag]);
  console.log(invoiceInfo)

  const fName = invoiceInfo[0] ? invoiceInfo[0].first_name : null
  // const fName =  ternary?.first_name
  return (
    <div>
      <div>
        <h1>Hey {fName}! Thanks for your order!</h1>
        <p>
          We appreciate your business! If you have any questions, please email us  sample@email.com .
          Here are some details
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    bag: reduxState.bagReducer.bag,
    user: reduxState.userReducer.user,
  };
};

export default connect(mapStateToProps, { setBag, clearBag })(Invoice);
