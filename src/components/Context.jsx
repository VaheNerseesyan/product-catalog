import { createContext, useContext, useEffect, useReducer, useState } from "react";
import productAPI from "../api/api";

const actions = {
    ADD_TO_BASKET: "add_to_basket",
    COUNT_INCREMENT: "count_increment",
    COUNT_DECREMENT: "count_decrement",
    DELETE_PROD: "delete_prod",
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.ADD_TO_BASKET: {
            const isExist = state.find((prod) => prod.id === payload.id);
            if (isExist) {
                return state.map((prod) =>
                    prod.id === payload.id ? { ...prod, count: prod.count + 1 } : prod
                );
            } else {
                return [...state, { ...payload, count: 1 }];
            }
        }

        case actions.COUNT_INCREMENT: {
            return state.map((prod) =>
                prod.id === payload ? { ...prod, count: prod.count + 1 } : prod
            );
        }

        case actions.COUNT_DECREMENT: {
            return state.map((prod) =>
                prod.id === payload && prod.count > 1 ? { ...prod, count: prod.count - 1 } : prod
            );
        }

        case actions.DELETE_PROD: {
            return state.filter((prod) => prod.id !== payload);
        }

        default:
            return state;
    }
};

const ContextApp = createContext();

export const useGlobalContext = () => {
    const context = useContext(ContextApp);
    if (!context) {
        throw new Error("useGlobalContext error");
    }
    return context;
};

export const ContextProvider = ({ children }) => {
    const [basket, dispatch] = useReducer(reducer, JSON.parse(localStorage?.getItem("BASKET_PRODUCTS") ?? "[]"));
    const [products, setProducts] = useState([]);
    const [isBasketMode, setIsBaksetMode] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        productAPI().then((res) => setProducts(res));
    }, []);

    useEffect(() => {
        const price = basket.reduce((curr, prod) => curr + prod.count * prod.price, 0);
        setTotalPrice(price);
    }, [basket]);

    useEffect(() => {
        console.log('Basket updated:', basket)
    }, [basket])

    useEffect(() => {
        if (basket.length > 0) {
            localStorage.setItem("BASKET_PRODUCTS", JSON.stringify(basket));
        }
    }, [basket]);

    return (
        <ContextApp.Provider value={{
            basket,
            dispatch,
            products,
            setProducts,
            isBasketMode,
            setIsBaksetMode,
            totalPrice,
            actions
        }}>{children}</ContextApp.Provider>
    );
};
