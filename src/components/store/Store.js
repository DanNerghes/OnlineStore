import React, {useState} from 'react'
import Categories from './Categories'
import AllProducts from './AllProducts';



export default function Store() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <div className='row'>
            <div className='col-3'>
                <Categories {...{selectedCategory, setSelectedCategory} } />
            </div>
            <div className='row col-9'>
                <AllProducts selectedCategory={selectedCategory} />
            </div>
        </div>
    )
}
