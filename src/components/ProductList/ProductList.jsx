import { use, useEffect, useReducer, useState } from "react";
import productAPI from "../../api/api";
import Product from "../Product/Product";
import style from './ProductList.module.css'
import Basket from "../Basket/Basket";

const actions = {
    ADD_TO_BASKET: 'add_to_busket',
    COUNT_INCREMENT: 'count_increment',
    COUNT_DECREMENT: 'count_decrement',
    DELETE_PROD: 'delete_prod',
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case actions.ADD_TO_BASKET: {
            const isExist = state.find(prod => prod.id === payload.id)
            if (isExist) {
                return state.map(prod => prod.id === payload.id ? { ...prod, count: prod.count + 1 } : prod)
            } else {
                return [...state, { ...payload, count: 1 }]
            }
        }
        case actions.COUNT_INCREMENT: {
            return state.map(prod => prod.id === payload ? { ...prod, count: prod.count + 1 } : prod)
        }
        case actions.COUNT_DECREMENT: {
            return state.map(prod => prod.id === payload && prod.count > 1 ? { ...prod, count: prod.count - 1 } : prod)
        }
        case actions.DELETE_PROD: {
            return state.filter(prod => prod.id !== payload)
        }
    }
}

function ProductList() {
    const [basket, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("BASKET_PRODUCTS") ?? []))
    const [products, setProducts] = useState([])
    const [isBasketMode, setIsBaksetMode] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        productAPI().then(res => setProducts(res))
    }, [])

    const basketToggle = () => {
        setIsBaksetMode(!isBasketMode)
    }

    const giveToBasket = (product) => {
        dispatch({ type: actions.ADD_TO_BASKET, payload: { ...product } })
    }

    const countIncrement = (id) => {
        dispatch({ type: actions.COUNT_INCREMENT, payload: id })
    }

    const countDecrement = (id) => {
        dispatch({ type: actions.COUNT_DECREMENT, payload: id })
    }

    useEffect(() => {
        setTotalPrice(basket.reduce((curr, prod) => {
            curr += prod.count * prod.price
            return curr
        }, 0))
    }, [basket])

    const deleteProd = (id) => {
        dispatch({ type: actions.DELETE_PROD, payload: id })
    }

    useEffect(() => {
        if (basket.length > 0) {
            localStorage.setItem("BASKET_PRODUCTS", JSON.stringify(basket))
        }
    }, [basket])

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
                        <div className={style.basketContainer}>
                            {basket.length === 0 ? (
                                <div className={style.emptyBasket}>Your basket is empty</div>
                            ) : (
                                basket.map(prod => (
                                    <Basket
                                        key={prod.id}
                                        {...prod}
                                        countIncrement={countIncrement}
                                        countDecrement={countDecrement}
                                        deleteProd={deleteProd}
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