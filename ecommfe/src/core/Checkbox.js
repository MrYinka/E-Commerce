import React, {useState, useEffect} from 'react';

//This is a child component. It's part of the parent component shop
//Sending the list of categories from the Shop as props
const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        //First, we check to see if the category ID is in the state
        //indexof() returns the first index if found in an array and -1 if not found.
        const currentCategoryId = checked.indexOf(c);
        //Gives us all categories in the state.
        const newlyCheckedCategoryId = [...checked];

        //if current check doesn't exist in the state, push
        //else pull/take off

        if(currentCategoryId === -1){ // if it doesn't exist, we push
            newlyCheckedCategoryId.push(c)
        }else{ //if it does exist, we splice or remove
            newlyCheckedCategoryId.splice(currentCategoryId, 1);
        }

        // console.log(newlyCheckedCategoryId);
        setChecked(newlyCheckedCategoryId);

        //Sending the array of category IDs to the parent component
        handleFilters(newlyCheckedCategoryId);
    };

    return categories.map((c, i) => (
        <li className="list-unstyled" key={i}>
            <input type="checkbox" className="form-check-input" onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));

};


export default Checkbox;