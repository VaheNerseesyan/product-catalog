import style from './Product.module.css'
import { useGlobalContext } from '../Context';

function Product({id, image, price, title, category}) {
    const { dispatch, actions } = useGlobalContext();

    const giveToBasket = () => {
        dispatch({ type: actions.ADD_TO_BASKET, payload: {id, image, price, title, category} })
    }

    return (
        <div className={style.product} key={id}>
            <h4>{title}</h4>
            <h4>{category}</h4>
            <h4>{price}</h4>
            <img src={image} alt="" />
            <button onClick={giveToBasket}>Add to Busket</button>
        </div>
    )
}

export default Product;