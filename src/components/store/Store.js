import React, {useState} from 'react'
import Sidebar from '../Sidebar'
import AllProducts from './AllProducts';

export default function Store() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filterProducts, setFilterProducts] = useState(null)

    return (
        <div className='row h-100 mt-4'>
            <div className='col-4 col-md-3 col-lg-2 vh-100 sticky' >
                <Sidebar {...{selectedCategory, setSelectedCategory, filterProducts, setFilterProducts} } />
            </div>
            <div className='row col-8 col-md-9 col-lg-10'>
                <AllProducts filterProducts={filterProducts} selectedCategory={selectedCategory} />
            </div>
        </div>
    )
}
