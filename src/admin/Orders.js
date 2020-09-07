import React, { useState, useEffect } from "react";
import { getAllOrders } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const preload = () => {
    getAllOrders(userId, token).then((data) => {
      if (data.error) {
        setError(true);
        setSuccess(false);
      } else {
        setError("");
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage category here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4 text-center mb-5">All Order status:</h2>

      <div className="row">
        <div className="col-12">
          {orders.map((order, index) => (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{order.status}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/order/update/${order._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Orders;
