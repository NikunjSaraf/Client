import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    size: "",
    category: "",
    categories: [],
    error: "",
    loading: false,
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  // Destructuring Values
  const {
    name,
    description,
    price,
    stock,
    size,
    category,
    categories,
    error,
    loading,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  // Loading Ctaegories
  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  // Using UseEffect Hooks
  useEffect(() => {
    preload();
  }, []);

  // Handle Change
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // Success Message
  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-5"
        style={{ display: createdProduct ? "" : "none" }}
      >
        {createdProduct} <h4>Product Created Successfully</h4>
      </div>
    );
  };

  // Error Message
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  // OnSubmit
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          stock: "",
          category: "",
          size: "",
          error: "",
          loading: false,
          price: "",
          createdProduct: data.name,
        });
        console.log("success");
      }
    });
  };

  // Form Creation
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={category}
        >
          <option>Category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
        <br />
        <select
          onChange={handleChange("size")}
          className="form-control"
          placeholder="Size"
          value={size}
        >
          <option>Size</option>
          <option value="a">Small</option>
          <option value="b">Medium</option>
          <option value="c">Large</option>
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add Product Here"
      description="Welcome to product creation"
      className="container bg-info p-4"
    >
      <Link className="btn btn-md btn-dark mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
