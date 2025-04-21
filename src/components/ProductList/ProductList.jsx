import { useEffect} from "react";
import Product from "../Product/Product";
import style from './ProductList.module.css'
import Basket from "../Basket/Basket";
import { useGlobalContext } from "../Context";


function ProductList() {
    const {
        basket,
        products,
        isBasketMode,
        setIsBaksetMode,
        totalPrice,
      } = useGlobalContext();

    const basketToggle = () => {
        setIsBaksetMode(!isBasketMode)
    }

    return (
        <div>
            <button onClick={basketToggle}>Basket</button>
            <div className={style.productGrid}>
                {!isBasketMode ? (
                    products.map(product => (
                        <Product
                            key={product.id}
                            {...product}
                        />
                    ))
                ) : (
                    <>
                        <p className={style.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</p>
                        <div className={style.basketContainer}>
                            {basket.length === 0 ? (
                                <div className={style.emptyBasket}>Your basket is empty</div>
                            ) : (
                                basket.map(prod => (
                                    <Basket
                                        key={prod.id}
                                        {...prod}
                                    />
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductList;