import React from 'react';
import {Link} from 'react-router-dom'
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";


const UserDashboard = () => {
    const {user : {firstname, lastname, email, role}} = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card">
                <h3 className="card-header">User Links</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/profile/update">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    };


    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">Name: {firstname} {lastname}</li>
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Role: {role === 1 ? 'Admin' : 'Registered user'}</li>
                </ul>
            </div>
        )
    };

    const purchaseHistory = () => {
      return (
          <div className="card ">
              <h3 className="card-header">Purchase History</h3>
              <ul className="list-group">
                  <li className="list-group-item">History</li>
              </ul>
          </div>
      )
    };

    return (
    <Layout title="Dashboard" description={`Welcome, ${firstname}!`} className="container">

        <div className="row">
            <div className="col-md-3">
                {userLinks()}
            </div>
            <div className="col-md-9">
                {userInfo()}
                {purchaseHistory()}
            </div>
        </div>



    </Layout>
    )
};





export default UserDashboard;