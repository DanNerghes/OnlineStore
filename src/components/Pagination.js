import React from 'react'

export default function Pagination({products, setPageSelected, productsPerPage}) {

    const numberOfPage = []

    function handleChangeThePage(page) {
        console.log(page);
        setPageSelected(page)
    }

    for(let i = 1; i <= Math.ceil(products.length / productsPerPage) ; i++) {
        console.log(products);
        numberOfPage.push(i)
    }

    return (
        <nav className='mt-4'>
            <ul className='pagination'>
                {numberOfPage.map( number => {
                return (<li key={number} className='page-item'>
                    <button className='page-link' onClick={() => handleChangeThePage(number)}> {number} </button>
                </li>
                )})}
            </ul>
        </nav>
    )
}
