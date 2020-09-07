import React, { useState, useEffect, Fragment } from "react";
import Base from "../core/Base";
import { getUserOrder } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";
import dateFormat from "dateformat";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getOrderDetail = () => {
    getUserOrder(userId, token).then((data) => {
      console.log(data);
      if (data?.error) {
        setError(data?.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  return (
    <Base title="UserDashboard Page">
      <h1 className="text-white">View Order Details</h1>
      <div className="row">
        {orders ? (
          orders.map((order, index) => {
            return (
              <Fragment key={index}>
                <div className="col-6">
                  <div className="card text-white bg-dark border border-info">
                    <h3 style={{ marginLeft: "10px" }}>
                      Order Date:
                      {dateFormat(order.createdAt, "dddd,mmmm dS, yyyy")}
                    </h3>
                    <h3 style={{ marginLeft: "10px" }}>
                      Order ID # {order._id}
                    </h3>
                    <h3 style={{ marginLeft: "10px" }}>
                      Order total $ {order.amount}
                    </h3>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card text-white bg-dark border border-info">
                    <h3 style={{ marginLeft: "10px" }}>
                      Status:
                      {order.status}
                    </h3>
                    <h3 style={{ marginLeft: "10px" }}>
                      Estimated Delivery Time:
                      {dateFormat(
                        new Date(
                          new Date().getTime() + 5 * 24 * 60 * 60 * 1000
                        ),
                        "dddd,mmmm dS, yyyy"
                      )}
                    </h3>
                    <h3 style={{ marginLeft: "10px" }}>
                      Product Details: {order.products[0].name} {"    "} Count:
                      {order.products[0].count}
                    </h3>
                  </div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <h3>No Orders</h3>
        )}
      </div>
    </Base>
  );
};

export default UserDashboard;
