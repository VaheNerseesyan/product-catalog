

function Basket({ }) {

    return (
        <div>
            <p>Total Price{ }</p>
            <div key={id}>
                <h4>{title}</h4>
                <h4>{category}</h4>
                <h4>{price}</h4>
                <img src={image} alt="" />
                
            </div>
        </div>
    )
}

export default Basket;