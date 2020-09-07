import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateStatus, getStatus } from "./helper/adminapicall";

const UpdateOrder = ({ match }) => {
  const [status, setStatus] = useState("");
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

  const preload = (orderId) => {
    getStatus(user._id, token).then((data) => {
      if (data.error) {
        setError(true);
        setSuccess(false);
      } else {
        setError("");
        setStatus(data.status);
      }
    });
  };

  useEffect(() => {
    preload(match.params.orderId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setStatus(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    updateStatus(user._id, token, match.params.orderId, { status }).then(
      (data) => {
        if (data?.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setStatus("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Status Updated Successfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Something Went Wrong</h4>;
    }
  };

  const statusForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Update Status</p>
          <input
            type="text"
            name="name"
            className="form-control my-3"
            autoFocus
            onChange={handleChange}
            value={status}
            required
          />
          <button onClick={onSubmit} className="btn btn-primary">
            Update Status
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update Status Here"
      description="Update your status for your orders"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounder">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {statusForm()}
          {goback()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateOrder;
