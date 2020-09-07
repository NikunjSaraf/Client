import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goback = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Go Back
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data?.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created Successfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Something Went Wrong</h4>;
    }
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Create Category</p>
          <input
            type="text"
            name="name"
            className="form-control my-3"
            autoFocus
            onChange={handleChange}
            value={name}
            required
            placeholder="For ex.Summer"
          />
          <button onClick={onSubmit} className="btn btn-primary">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create Category Here"
      description="Add a new category for your products"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounder">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {categoryForm()}
          {goback()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
