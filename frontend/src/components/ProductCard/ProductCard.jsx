import React from 'react';
import './ProductCard.css';

export const ProductCard = (props) => {

    const {
        id,
        logo,
        price,
        name,
        onCardClick
    } = props;

  return (
    <div className='product-container p-4'>
        
        <div className='product-image'>
            <img
                alt=""
                src={logo}
                width="80%"
                height="auto"
                className="d-inline-block align-top mb-3"
            />
        </div>
        
        {
            id > 0 &&
            <div className='product-info'>
                <h4 style={{fontWeight:'bold'}}> Q {price} </h4>
            </div>
        }

        <div className='product-info'>
            <h3>{name}</h3>
        </div>    

    </div>
  );
}
