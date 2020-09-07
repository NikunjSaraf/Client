import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getCategories } from "./helper/adminapicall";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const ManageCategorys = () => {
  const [category, setCategory] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategory(data);
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
      <h2 className="mb-4 text-center mb-5">All category:</h2>

      <div className="row">
        <div className="col-12">
          {category.map((category, index) => (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {}} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategorys;
