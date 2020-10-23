import React, { useEffect, useState } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default function Categories({setSelectedCategory}) {
    const db = firebase.firestore();
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        const categoriesArr = []
        db.collection("products").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    categoriesArr.push( {...doc.data(), id:doc.id} )
                });

        function sortCategories(arr) {
            const newArr = ['All']
            for(const item of arr) {
                if(!newArr.includes(item.productCategory)){
                    console.log(item.productCategory);
                    newArr.push(item.productCategory);
                }
            }
            return newArr
        }
        setAllCategories(sortCategories(categoriesArr))  
            })
    }, [db])

    return (
        <ul>
            {allCategories.map( obj => {
                return (
                    <li key={obj} onClick={() => setSelectedCategory(obj)}>{obj}</li>
                )
            })}
        </ul>
    )
}
