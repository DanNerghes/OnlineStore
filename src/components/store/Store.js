import React, {useState} from 'react'
import Pagination from '../Pagination';
import Sidebar from '../Sidebar'
import AllProducts from './AllProducts';

export default function Store() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filterProducts, setFilterProducts] = useState(null)
    
    const [productsOnPage, setProductsOnPage] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [pageSelected, setPageSelected] = useState(1);
    const [productsPerPage] = useState(4)

    return (
        <div className='row h-100 mt-4'>
            <div className='col-4 col-md-3 col-lg-2 vh-100 sticky' >
                <Sidebar {...{ setSelectedCategory, setFilterProducts} } />
            </div>
            <div className=' col-8 col-md-9 col-lg-10 justify-content-center w-100'>
                <AllProducts filterProducts={filterProducts} 
                    selectedCategory={selectedCategory} 
                    pageSelected={pageSelected} 
                    setProductsOnPage={setProductsOnPage}
                    productsOnPage={productsOnPage}
                    setAllProducts={setAllProducts}
                    allProducts={allProducts}
                    productsPerPage={productsPerPage}
                    setPageSelected={setPageSelected} 

                    />
                <Pagination products={allProducts} 
                    setPageSelected={setPageSelected} 
                    productsPerPage={productsPerPage} 
                    />
            </div>
        </div>
    )
}
