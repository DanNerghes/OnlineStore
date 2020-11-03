import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import AllProducts from './AllProducts';

export default function Store() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filterProducts, setFilterProducts] = useState(null)

    return (
        <div className='row h-100 mt-4'>
            <div className='col-12 col-md-3 col-lg-2' >
                <Sidebar {...{ setSelectedCategory, setFilterProducts} } />
            </div>
            <div className=' col-12 col-md-9 col-lg-10 justify-content-center w-100'>
                <AllProducts  filterProducts={filterProducts} selectedCategory={selectedCategory}/>
            </div>
        </div>
    )
}
