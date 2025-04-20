import { useState } from 'react';
import style from './Product.module.css'

function Product({ id, image, price, title, category, giveToBasket }) {

    return (
        <div className={style.product} key={id}>
            <h4>{title}</h4>
            <h4>{category}</h4>
            <h4>{price}</h4>
            <img src={image} alt="" />
            <button onClick={() => giveToBasket({ id, image, price, title, category})}>Add to Busket</button>
        </div>
    )
}

export default Product;