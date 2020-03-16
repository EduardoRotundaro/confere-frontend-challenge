import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import If from '../../components/If';
import productPhotoFallback from '../../assets/images/productPhotoFallback.png';
import {isAValidImageURL} from '../../other/utils';

function Card({
    id,
    imageUrl, 
    name, 
    actualPrice, 
    regularPrice, 
    installments, 
    discountPercentage,
    sizes,
    available
}) {
    const [image, setImage] = useState(null);

    function renderSizes() {
        return sizes.map(({size, available}) => {
            if(available) return (<span className="badge badge-primary m-1" key={size}>{size}</span>);
            else return (<span className="badge badge-light m-1" key={size}>{size}</span>);
        });
    }

    useEffect(() => {
        async function checkifImageURLisValid() {
            let url = await isAValidImageURL(imageUrl)? imageUrl : productPhotoFallback;
            setImage(url);
        }
        
        checkifImageURLisValid();
    }, [imageUrl]);

    return (
        <div className="card h-100">
            <Link to={`/product/${id}`}>
                <img src={image} className="card-img-top" alt={name} />
            </Link>
            <div className="card-body">
                <p className="card-text text-center">{name}</p>
                <If condition={discountPercentage}>
                    <h3><span className="badge badge-success">{discountPercentage} OFF</span></h3>
                </If>
                <div className="mb-2">
                    {renderSizes()}
                </div>
                <h5 className="card-title">
                    <If condition={regularPrice!==actualPrice}>
                        <span className="">{regularPrice}</span>
                    </If>
                    {actualPrice}
                </h5>
                <p className="card-text">{installments}</p>
                <If condition={!available}>
                    <div className="alert alert-warning text-center" role="alert">
                        Indisponível
                    </div>
                </If>
                <p>
                    <Link to={`/product/${id}`} className="btn btn-block btn-primary">
                        Ver mais
                    </Link>
                </p>
            </div>
        </div>
    );
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    regularPrice: PropTypes.string.isRequired,
    installments: PropTypes.string.isRequired,
};

export default Card;
