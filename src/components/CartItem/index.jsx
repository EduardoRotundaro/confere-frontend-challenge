import React, {useState} from 'react';
import PropTypes from 'prop-types';

function CartItem({
    id,
    image,
    name,
    actualPrice,
    removeFromCart,
    size
}) {
    const [quantity, setQuantity] = useState(1);

    function decreaseQuantity() {
        if(quantity===1) removeFromCart(id);
        else setQuantity(quantity - 1);
    }

    return (
        <div className="media mb-4">
            <img src={image} className="mr-4" alt={name} />
            <div className="media-body p-2">
                <small>{name}</small>
                <h4>{actualPrice}</h4>
                <small className="card-text">
                    <strong>Tamanho: </strong>{size}
                </small>
                <div>
                    <button 
                        type="button" 
                        className="btn btn-sm btn-danger m-1"
                        onClick={() => decreaseQuantity()}
                    >
                        <i className="fa fa-minus"></i>
                    </button>
                    <strong className="bg-light p-1 ml-2 mr-2">{quantity}</strong>
                    <button 
                        type="button" 
                        className="btn btn-sm btn-success m-1"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        <i className="fa fa-plus"></i>
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-sm btn-danger m-1"
                        onClick={() => removeFromCart(id)}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    actualPrice: PropTypes.string.isRequired,
};

export default CartItem;
