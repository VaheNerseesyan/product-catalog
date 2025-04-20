import style from './Basket.module.css';

function Basket({ id, title, category, price, image, count, countIncrement, countDecrement}) {

    return (
        <div>
            <div className={style.basket} key={id}>
                <h4>{title}</h4>
                <h4>{category}</h4>
                <h4>{price}</h4>
                <img src={image} alt="" />
                <div className={style.basketButtons}>
                    <button onClick={() => countDecrement(id)}>-</button>
                    <h4>{count}</h4>
                    <button onClick={() => countIncrement(id)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default Basket;