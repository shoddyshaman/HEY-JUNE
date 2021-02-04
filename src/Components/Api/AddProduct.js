import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { setProduct } from "../../Redux/productReducer";
import "./AddProduct.css";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import { v4 as randomString } from "uuid";

const AddProduct = (props) => {
  const [userInput, setUserInput] = useState({
    productName: "",
    price: '',
    productImage: "",
    category: "",
    description: "",
  });
  const [isUploading, setIsuploading] = useState(false);

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then((response) => {
        setIsuploading(false);
        setUserInput({...userInput, productImage:url})
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch((err) => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  const getSignedRequest = ([file]) => {
    setIsuploading(true);

    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    axios
      .get("/sign-s3", {
        params: {
          "file-name": fileName,
          "file-type": file.type,
        },
      })
      .then((response) => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    axios
      .post("/api/products", {
        productName: userInput.productName,
        price: userInput.price,
        productImage: userInput.productImage,
        category: userInput.category,
        description: userInput.description,
      })
      .then((res) => {
        props.setProduct(res.data);
        alert("Product added")
        setUserInput({
          productName: "",
          price: '',
          productImage: "",
          category: "",
          description: "",
        })
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form className="add-product-form">
        Product Name
        <input type="text" name="productName" onChange={handleChange} value={userInput.productName} required />
        Price <input type="number" name="price" onChange={handleChange} value={userInput.price} required />
        Product Image
        <Dropzone
          onDropAccepted={getSignedRequest}
          accept="image/*"
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                position: "relative",
                width: 200,
                height: 80,
                borderWidth: 3,
                marginBottom: 25,
                borderColor: "rgb(141, 147, 241)",
                borderStyle: "dashed",
                borderRadius: 5,
                display: "inline-block",
                fontSize: 17,
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()}/>
              {isUploading ? (
                <GridLoader />
              ) : (
                <p>Drop files here, or click to select files</p>
              )}
            </div>
          )}
        </Dropzone>
        <p id='p-tag'>{userInput.productImage}</p><br></br>
        {/* <input type="text" name="productImage" onChange={handleChange} /> */}
        Category <input type="text" name="category" onChange={handleChange} value={userInput.category} required/>
        Description
        <input type="text" name="description" onChange={handleChange} value={userInput.description} required/>
        <button onClick={handleAddProduct}>Add it</button>
      </form>
    </div>
  );
};

export default connect(null, { setProduct })(AddProduct);
