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
        <div className="media mb-4 p-2">
            <img src={image} className="mr-3" alt={name} />
            <div className="media-body">
                <h5>{name}</h5>
                <h3 className="display-5">{actualPrice}</h3>
                <p className="card-text">
                    <strong>Tamanho: </strong>{size}
                </p>
                <div>
                    <button 
                        type="button" 
                        className="btn btn-sm btn-danger m-1 mr-3"
                        onClick={() => decreaseQuantity()}
                    >
                        <i className="fa fa-minus"></i>
                    </button>
                    <strong>{quantity}</strong>
                    <button 
                        type="button" 
                        className="btn btn-sm btn-success m-1 ml-3"
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
