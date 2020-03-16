import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import If from '../../components/If';
import {getProductById} from '../../api/services';
import {updatePageTitle} from '../../other/utils';
import {addItemToCartStore} from '../../redux/actions/cart';
import {isAValidImageURL} from '../../other/utils';
import productPhotoFallback from '../../assets/images/productPhotoFallback.png';

export default function Product() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [redirect, needRedirect] = useState(false);
    const [selectedSize, selectSize] = useState(null);
    const [submited, trySubmit] = useState(false);
    const [productImage, setImage] = useState(null);

    async function fetchData() {
        try {
            const {
                name,
                code_color,
                color,
                on_sale,
                regular_price,
                actual_price,
                discount_percentage,
                installments,
                image,
                sizes
            } = await getProductById(id);
            updatePageTitle(name);
            setProduct({
                name,
                color,
                installments,
                image,
                sizes,
                codeColor: code_color,
                onSale: on_sale,
                regularPrice: regular_price,
                actualPrice: actual_price,
                discountPercentage: discount_percentage,
            });
        } catch (error) {
            console.log(error.message);   
        }
    }

    async function checkifImageURLisValid() {
        let url = await isAValidImageURL(product.image)? product.image : productPhotoFallback;
        setImage(url);
    }

    useEffect(() => {
        updatePageTitle('...');
        fetchData();
        checkifImageURLisValid();
    }, []);

    function renderProductSizesOptions() {
        return product.sizes && product.sizes.map(({size, available}) => (
            <button 
                key={size}
                type="button" 
                className={`btn btn${selectedSize===size? '-' : '-outline-'}primary`}
                disabled={!available}
                onClick={() => selectSize(size)}
            >
                {size}
            </button>
        ));
    }

    function addItemToCart() {
        trySubmit(true);
        if(!selectedSize) return;
        const {
            color,
            installments,
            sizes,
            codeColor: code_color,
            onSale: on_sale,
            regularPrice: regular_price,
            discountPercentage: discount_percentage,
            ...importantInfo
        } = product;

        dispatch(addItemToCartStore(importantInfo));
        needRedirect(true);
    }

    return redirect? (<Redirect to="/cart" />) : (
        <main>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="row no-gutters">
                                    <div className="col-xl-4">
                                        <img src={productImage} className="card-img" alt="..." />
                                    </div>
                                    <div className="col-xl-8">
                                        <div className="card-body">
                                            <p className="card-text"><small className="text-muted">{product.name}</small></p>
                                            <p className="card-text">{product.discount_percentage}</p>
                                            <h5 className="card-title">{product.actualPrice}</h5>
                                            <h5 className="card-title">{product.regularPrice}</h5>
                                            <p className="card-text">{product.installments}</p>
                                            <p className="card-text">{product.color}</p>
                                            <If condition={product.onSale}>
                                                <div className="form-group">
                                                    {renderProductSizesOptions()}
                                                </div>
                                            </If>
                                            <If condition={submited && !selectedSize}>
                                                <div className="text-danger">Selecione um tamanho</div>
                                            </If>
                                            <If condition={product.onSale}>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-block btn-primary"
                                                    onClick={addItemToCart}
                                                >
                                                    Adicionar ao carrinho
                                                </button>
                                            </If>
                                            <If condition={!product.onSale}>
                                                <div className="alert alert-warning" role="alert">
                                                    Indisponível! Avise-me quando chegar
                                                </div>
                                            </If>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
