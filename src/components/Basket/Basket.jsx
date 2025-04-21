import { useGlobalContext } from '../Context';
import style from './Basket.module.css';

function Basket({ id, title, category, price, image, count}) {
    const { dispatch, actions } = useGlobalContext();

    const countIncrement = () => dispatch({ type: actions.COUNT_INCREMENT, payload: id });
    const countDecrement = () => dispatch({ type: actions.COUNT_DECREMENT, payload: id });
    const deleteProd = () => dispatch({ type: actions.DELETE_PROD, payload: id });

    return (
        <div>
            <div className={style.basket}>
                <img src={image} alt={title} />
                <h4>{title}</h4>
                <h4>{category}</h4>
                <h4>${price}</h4>
                <div className={style.basketButtons}>
                    <button onClick={countDecrement}>-</button>
                    <h4>{count}</h4>
                    <button onClick={countIncrement}>+</button>
                </div>
                <button className={style.deleteButton} onClick={deleteProd}>Delete</button>
            </div>
        </div>
    )
}

export default Basket;