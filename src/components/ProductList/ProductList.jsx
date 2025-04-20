import { use, useEffect, useReducer, useState } from "react";
import productAPI from "../../api/api";
import Product from "../Product/Product";
import style from './ProductList.module.css'
import Basket from "../Basket/Basket";

// const ACTIONS = {
//     GIVE_TO_BUSKET: 'give_to_basket',
// }

// const reducer = ({ state, action }) => {
//     const { type, payload } = action
//     switch (type) {
//         case ACTIONS.GIVE_TO_BUSKET: {

//         }
//     }
// }

function ProductList() {
    // const [prductList, dispatch] = useReducer(reducer, products)
    const [products, setProducts] = useState([])
    const [isBasketMode, setIsBaksetMode] = useState(false)
    const [boughtProducts, setBoughtProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        productAPI().then(res => setProducts(res))
    }, [])

    const basketToggle = () => {
        setIsBaksetMode(!isBasketMode)
    }

    const giveToBasket = (id) => {
        const product = products.find(p => p.id === id);

        setBoughtProducts(prevProds => {
            const isExist = prevProds.some(p => p.id === id)
            if (isExist) {
                return prevProds.map(prod => prod.id === id ? { ...prod, count: prod.count + 1 } : prod)
            } else {
                return [...prevProds, { ...product, count: 1 }]
            }
        });
    };

    const countIncrement = (id) => {
        setBoughtProducts(prevProds =>
            prevProds.map(prod => prod.id === id ? { ...prod, count: prod.count + 1 } : prod)
        )
    }

    const countDecrement = (id) => {
        setBoughtProducts(prevProds =>
            prevProds.map(prod => (prod.id === id) && prod.count > 1 ? { ...prod, count: prod.count - 1 } : prod)
        )
    }

    useEffect(() => {
        setTotalPrice(boughtProducts.reduce((curr, prod) => {
            curr += prod.count * prod.price
            return curr
        }, 0))
    }, [boughtProducts])

    const deleteProd = (id) => {
        setBoughtProducts(prevProds => 
            prevProds.filter(prod => prod.id !== id)
        )
    }

    useEffect(() => {
        const data = localStorage.getItem("BASKET_PRODUCTS")
        if (data) {
            setBoughtProducts(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        if (boughtProducts.length > 0) {
            localStorage.setItem("BASKET_PRODUCTS", JSON.stringify(boughtProducts))
        }
    }, [boughtProducts])

    return (
        <div>
            <button onClick={basketToggle}>Basket</button>
            <div className={style.productGrid}>
                {!isBasketMode ? (
                    products.map(product => (
                        <Product
                            key={product.id}
                            {...product}
                            giveToBasket={giveToBasket}
                        />
                    ))
                ) : (
                    <>
                        <p>Total Price: {totalPrice.toFixed(2)}</p>
                        <div className={style.basketGrid}>
                            {boughtProducts.length === 0 ? <p>Empty</p> : boughtProducts.map(prod => (
                                <Basket
                                    key={prod.id}
                                    {...prod}
                                    countIncrement={countIncrement}
                                    countDecrement={countDecrement}
                                    deleteProd={deleteProd}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductList;