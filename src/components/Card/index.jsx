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

    useEffect(() => {
        async function checkifImageURLisValid() {
            let url = await isAValidImageURL(imageUrl)? imageUrl : productPhotoFallback;
            setImage(url);
        }

        checkifImageURLisValid();
    }, []);

    function renderSizes() {
        return sizes.map(({size, available}) => {
            if(available) return (<span className="badge badge-primary" key={size}>{size}</span>);
            else return (<span className="badge badge-light" key={size}>{size}</span>);
        });
    }

    return (
        <div className="card">
            <Link to={`/product/${id}`}>
                <img src={image} className="card-img-top" alt="" />
            </Link>
            <div className="card-body">
                <p className="card-text text-center">{name}</p>
                <If condition={discountPercentage}>
                    <h3><span className="badge badge-success">{discountPercentage}</span></h3>
                </If>
                <div>
                    {renderSizes()}
                </div>
                <h5 className="card-title">
                    <span>{regularPrice}</span>
                    {actualPrice}
                </h5>
                <p className="card-text">{installments}</p>
                <If condition={available}>
                    <p className="card-text">Indisponível</p>
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
