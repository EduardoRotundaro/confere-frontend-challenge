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
            checkifImageURLisValid(image);
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

    async function checkifImageURLisValid(image) {
        let url = await isAValidImageURL(image)? image : productPhotoFallback;
        setImage(url);
    }

    useEffect(() => {
        updatePageTitle('...');
        fetchData();
    }, []);

    function renderProductSizesOptions() {
        return product.sizes && product.sizes.map(({size, available}) => (
            <button 
                key={size}
                type="button" 
                className={`btn btn${selectedSize===size? '-' : '-outline-'}primary m-1`}
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
        dispatch(addItemToCartStore(
            {
                codeColor: product.codeColor,
                name: product.name,
                actualPrice: product.actualPrice,
                image: productImage,
                size: selectedSize,
            }
        ));
        needRedirect(true);
    }

    return redirect? (<Redirect to="/cart" />) : (
        <main>
            <section>
                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <div className="col-xl-12">
                            <div className="card shadow-sm">
                                <div className="row no-gutters">
                                    <div className="col-xl-4">
                                        <img src={productImage} className="card-img" alt="..." />
                                    </div>
                                    <div className="col-xl-8">
                                        <div className="card-body">
                                            <h3 className="display-5">
                                                {product.name}
                                            </h3>
                                            <If condition={product.actualPrice!==product.regularPrice}>
                                                de <span>{product.regularPrice}</span>
                                            </If>
                                            <p>
                                                por <span>{product.actualPrice}</span>
                                            </p>
                                            <If condition={product.discountPercentage}>
                                                <h3><span className="badge badge-success">{product.discountPercentage} OFF</span></h3>
                                            </If>
                                            <p className="card-text">{product.installments}</p>
                                            <p className="card-text">
                                                <strong>Cor:</strong><br />
                                                {product.color}
                                            </p>
                                            <If condition={product.onSale}>
                                                <strong>Tamanhos:</strong><br/>
                                                <If condition={submited && !selectedSize}>
                                                    <span className="text-danger">Selecione um tamanho</span>
                                                </If>
                                                <div className="form-group">
                                                    {renderProductSizesOptions()}
                                                </div>                                                
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
