import React, {useState} from 'react'
import Sidebar from '../Sidebar'
import AllProducts from './AllProducts';
import { Container } from 'react-bootstrap';

export default function Store() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filterProducts, setFilterProducts] = useState(null)

    return (
        <div className='row h-100'>
            <Container className='col-4 col-md-3 col-lg-2 vh-100 sticky' >
                <Sidebar {...{selectedCategory, setSelectedCategory, filterProducts, setFilterProducts} } />
            </Container>
            <div className='row col-8 col-md-9 col-lg-10'>
                <AllProducts filterProducts={filterProducts} selectedCategory={selectedCategory} />
            </div>
        </div>
    )
}
