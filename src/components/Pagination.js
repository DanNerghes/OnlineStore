import React from 'react'

export default function Pagination({products, itemsOnPage, setPageSelected}) {

    const numberOfPage = []

    function handleChangeThePage(page) {
        setPageSelected(page)
    }

    for(let i = 1; i <= Math.ceil(products.length / itemsOnPage) ; i++) {
        numberOfPage.push(i)
    }

    return (
        <nav className='mt-4 d-flex justify-content-center w-100'>
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
