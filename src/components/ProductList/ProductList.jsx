import { use, useEffect, useReducer, useState } from "react";
import productAPI from "../../api/api";
import Product from "../Product/Product";
import style from './ProductList.module.css'

const ACTIONS = {

}

const reducer = ({ state, action }) => {
    const { type, payload } = action
    switch (type) {

    }
}

function ProductList() {
    const [products, setProducts] = useState([])
    const [prductList, dispatch] = useReducer(reducer, products)
    const [isBasketMode, setIsBaksetMode] = useState(false)

    useEffect(() => {
        productAPI().then(res => setProducts(res))
    }, [])

    const basketToggle = () => {
        setIsBaksetMode(!isBasketMode)
    }

    return (
        <div>
            <h4>0</h4>
            <button onClick={basketToggle}>Basket</button>
            <div className={style.productGrid}>
                {!isBasketMode ? (
                    products.map(product => (
                        <Product
                            {...product}
                        />
                    ))
                ) : (
                    boughtProducts
                )}
                
            </div>
        </div>

    )
}

export default ProductList;