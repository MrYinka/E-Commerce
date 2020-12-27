import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import { createProduct, getCategories } from './apiAdmin'



const AddProduct = () => {

    const [values, setValues] = useState({
            name: '',
            description: '',
            price: '',
            categories: [],
            category: '',
            shipping: '',
            quantity: '',
            loading: false,
            error: '',
            success: '',
            createdProduct: '',
            redirectToProfile: false,
            formData: ''
    });


    const { name, description, price, categories, category, shipping, quantity, loading, error, success, createdProduct, redirectToProfile, formData } = values;

    const init = () => {
        getCategories()
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error});
                }else{
                    setValues({...values, categories: data, formData: new FormData()});
                }
            })
    }

    const {user:{_id}, token} = isAuthenticated();

    useEffect(()=> {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, error:'', success: false,  [name]: value})
    };

    const clickSubmit = e => {
        e.preventDefault();
        setValues({...values, error: '', loading: true})
        createProduct(_id, token, formData)
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                }else{
                    setValues({...values, name: '', description: '', photo: '', price: '', quantity: '', error: '', success:true, loading: false, createdProduct: data.name});
                }
            })
    }

    const newProductForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Add Image</h4>

            <div className="form-group">
                <label className="btn btn-outline btn-primary">
                <input type="file" name="photo" accept="image/*" onChange={handleChange('photo')} />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange('name')}  value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea  className="form-control" onChange={handleChange('description')}  value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number"  className="form-control" onChange={handleChange('price')}  value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select  className="form-control" onChange={handleChange('category')} >
                    <option>select a category</option>
                    {categories && categories.map((c, i)=> (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number"  className="form-control" onChange={handleChange('quantity')}  value={quantity} />
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select  className="form-control" onChange={handleChange('shipping')} >
                    <option>select shipping options</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <button className="btn btn-outline-primary">Create Product</button>

        </form>
    );


    const errorMsg = () => {
      if(error !== ''){
          return (
              <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                  {error}
              </div>
          );
      }
    };

    const successMsg = () => {
       if(success){
           return (
               <div className="alert alert-success" style={{display: createdProduct ? '' : 'none'}}>
                   <h4>{`${createdProduct}`} is created successfully!</h4>
               </div>
           );
       }
    };

    const showLoading = () => loading && (<div className="alert alert-info"><h3>Loading.....</h3></div>);


    return (
        <Layout title="Add a New Product" description="Product Items" className="container col-md-4 offset-md-4">
            {showLoading()}
            {errorMsg()}
            {successMsg()}
            {newProductForm()}
        </Layout>
    );

};




export default AddProduct;