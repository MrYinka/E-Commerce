import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import Card from  './Card';
import {getCategories, getFilteredProducts} from './apiCore';
import Checkbox from './Checkbox';
import {prices} from './fixedPrices';
import RadioBox from './RadioBox';


const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });

    const init = () => {
        getCategories()
            .then(data => {
                if(data.error){
                    setError(data.error);
                }else{
                    setCategories(data)
                }
            })
    };

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters)
            .then(data => {
                if(data.error){
                    setError(data.error)
                }else{
                    setFilteredResults(data.data);
                }
            })
    };


    useEffect(()=> {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);




    //filters ~ Array of category ID's, filterBy ~ Array of categories or prices
    const handleFilters = (filters, filterBy) => {
        // console.log('Shop', filters, filterBy)
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy == 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(skip, limit, myFilters.filters);

        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }

        return array;

    };






    return (
        <Layout title="Shop Page" description="Search and find books of your choice" className="container">

            <div className="row">
                <div className="col-md-4">
                    <h4>Filter By Category</h4>
                   <ul>
                       <Checkbox categories={categories}  handleFilters={filters => handleFilters(filters, 'category')} />
                   </ul>

                    <h4>Filter By Price Range</h4>
                    <div>
                        <RadioBox prices={prices}  handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>
                </div>
                <div className="col-md-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                                <Card key={i} product={product}/>
                        ))}

                    </div>
                </div>
            </div>


        </Layout>
    )

}



export default Shop;