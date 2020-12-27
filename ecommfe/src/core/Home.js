import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import {getProducts} from "./apiCore";
import Card from  './Card'


const Home = () => {

    const [productBySale, setProductBySale] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductBySale = () => {
        getProducts('sold')
            .then(data => {
                if(data.error){
                    setError(data.error);
                }else{
                    setProductBySale(data);
                }
            });
    };

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data => {
                if(data.error){
                    setError(data.error)
                }else{
                    setProductByArrival(data)
                }
            })
    };

    //Runs when the component mounts and when there's a state change
    useEffect(() => {
        loadProductByArrival();
        loadProductBySale();
    }, [])

    return (
       <Layout title="Home Page" description="Node React E-Commerce App" className="container">


       <h2 className="mb-4">New Arrivals</h2>
       <div className="row">
           {productByArrival.map((p, i) => (<Card key={i} product={p} />))}
       </div>

       <h2 className="mb-4">Best Sellers</h2>
       <div className="row">
           {productBySale.map((p, i) => (<Card key={i} product={p} />))}
       </div>

       </Layout>
    )
}


export default Home;