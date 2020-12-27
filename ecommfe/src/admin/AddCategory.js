import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import { createCategory } from './apiAdmin'

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user: {_id}, token} = isAuthenticated();


    const handleChange = e => {
        setError(false);
        setSuccess(false);
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(_id, token, {name})
            .then(data => {
                if(data.error){
                    setError(data.error);
                }else{
                    setError("");
                    setSuccess(true);
                }
            })
    };


    const newCategoryForm = () => (
        //I have two methods for the form: change and submit
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange}  value={name} autoFocus />
            </div>
            <button className="btn btn-outline-primary btn-sm">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if(success){
            return (<h5 className="text-success">{name} is successfully created!</h5>);
        }
    };


    const showError = () => {
        if(error){
            return (<h5 className="text-danger">{error}</h5>);
        }
    };

    const goBack = () => (
        <div className="mb-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>
    );



    return (
        <Layout title="Add a New Category" description="Product's Category" className="container col-md-4 offset-md-4">
            {goBack()}
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
        </Layout>
    );


};



export default AddCategory;