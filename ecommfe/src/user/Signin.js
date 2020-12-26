import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout';
import {signin, authenticate, isAuthenticated} from '../auth';


const Signin = () => {

    const [values, setValues] = useState({
        email: 'mide@mail.com',
        password: 'mide123',
        error: false,
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, error, loading, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error:false, loading:false, [name]:event.target.value})
    }


    const clickSignIn = event => {
        event.preventDefault();
        setValues ({...values, loading: true});
        signin({email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading:false});
                }else{
                    authenticate(data, ()=> {
                        setValues({...values, redirectToReferrer: true });
                    });
                }
            })
    }


    const signInForm = () => (

        <form>
            <div className="form-group">
                <label htmlFor="email" className="form-group">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} value={email} />
            </div>

            <div className="form-group">
                <label htmlFor="password" className="form-group">Password</label>
                <input type="password" className="form-control" onChange={handleChange('password')} value={password} />
            </div>

            <button  onClick={clickSignIn} className="btn btn-primary btn-sm">Sign in</button>

        </form>
    );

    const errorMsg = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );
    const Loading = () => loading && (<div className="alert alert-info"><h3>Loading.....</h3></div>);

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }else{
               return <Redirect to="/user/dashboard" />
            }
        }

        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    };

    return (
        <Layout title="Sign up" description="Don't have an account register here!" className="container col-md-4 offset-md-4">
            {Loading()}
            {errorMsg()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    );
};




export default Signin;