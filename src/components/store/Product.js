import React from 'react'

export default function Product({product}) {

    return (
        <div className="card col-3">
            <img className="card-img-top" src={product.imgUrl} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productCategory}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}
