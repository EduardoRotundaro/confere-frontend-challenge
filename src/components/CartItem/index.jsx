import React from 'react';
import PropTypes from 'prop-types';

function CartItem({
    id,
    image,
    name,
    actualPrice,
    removeFromCart,
    size
}) {
    return (
        <div className="card">
            <div className="row no-gutters">
                <div className="col-xl-4">
                    <img src={image} className="card-img" alt={name} />
                </div>
                <div className="col-xl-8">
                    <div className="card-body">
                        <p className="card-text">{name}</p>
                        <p className="card-text">{actualPrice}</p>
                        <p className="card-text">{size}</p>
                        <div>
                            <button 
                                type="button" 
                                className="btn btn-sm btn-danger"
                                onClick={() => removeFromCart(id)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
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
