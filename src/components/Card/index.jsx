import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import productPhotoFallback from '../../assets/images/productPhotoFallback.png';
import {isAValidImageURL} from '../../other/utils';

function Loader({
    id,
    imageUrl, 
    name, 
    actualPrice, 
    regularPrice, 
    installments, 
    discountPercentage
}) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function checkifImageURLisValid() {
            let url = await isAValidImageURL(imageUrl)? imageUrl : productPhotoFallback;
            setImage(url);
        }

        checkifImageURLisValid();
    }, []);

    return (
        <Link to={`/product/${id}`}>
            <div className="card">
                <img src={image} className="card-img-top" alt="" />
                <div className="card-body">
                    <p className="card-text text-center">{name}</p>
                    <p>{discountPercentage || '-'}</p>
                    <h5 className="card-title">
                        <span>{regularPrice}</span>
                        {actualPrice}
                    </h5>
                    <p className="card-text">{installments}</p>
                    <p>
                        <button type="button" className="btn btn-block btn-primary">Adicionar ao carrinho</button>
                    </p>
                </div>
            </div>
        </Link>
    );
}

Loader.propTypes = {
    name: PropTypes.string.isRequired,
    regularPrice: PropTypes.string.isRequired,
    installments: PropTypes.string.isRequired,
};

export default Loader;
