import React, {useState} from 'react';
import {Link } from 'react-router-dom'
import Layout from '../core/Layout';
import {signup} from '../auth';


const Signup = () => {

    const [values, setValues] = useState({
       firstname: '',
       lastname: '',
       email: '',
       password: '',
       error: false,
       success: false,
    });

    const {firstname, lastname, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error:false, success:false, [name]:event.target.value})
    }


    const register = event => {
        event.preventDefault();
        // setValues ({...values, error: false});
        signup({firstname, lastname, email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, success:false})
                }else{
                    setValues({...values, firstname: '', lastname: '', email: '', password: '', error:'', success: true })
                }
            })
    }


    const signUpForm = () => (

        <form>
            <div className="form-group">
                <label htmlFor="firstname" className="form-group">First Name</label>
                <input type="text" className="form-control" onChange={handleChange('firstname')} value={firstname} />
            </div>

            <div className="form-group">
                <label htmlFor="lastname" className="form-group">Last Name</label>
                <input type="text" className="form-control" onChange={handleChange('lastname')} value={lastname} />
            </div>

            <div className="form-group">
                <label htmlFor="email" className="form-group">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} value={email} />
            </div>

            <div className="form-group">
                <label htmlFor="password" className="form-group">Password</label>
                <input type="password" className="form-control" onChange={handleChange('password')} value={password} />
            </div>

            <button  onClick={register} className="btn btn-primary btn-sm">Sign up</button>
            
        </form>
    );

    const errorMsg = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );
    const successMsg = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
           New Account Created Successfully! Please <Link to="/signin">Sign in</Link>.
        </div>
    );

    
    return (
        <Layout title="Sign up" description="Don't have an account register here!" className="container col-md-4 offset-md-4">
            {errorMsg()}
            {successMsg()}
            {signUpForm()}
        </Layout>
    );
};




export default Signup;