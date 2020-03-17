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

    async function checkifImageURLisValid(image) {
        let url = await isAValidImageURL(image)? image : productPhotoFallback;
        setImage(url);
    }

    useEffect(() => {
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

        window.scrollTo(0, 0);
        updatePageTitle('...');
        fetchData();
    }, [id]);

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
        <main className="product">
            <section>
                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <div className="col-xl-12">
                            <div className="card shadow-sm">
                                <div className="row no-gutters">
                                    <div className="col-xl-4">
                                        <img src={productImage} className="card-img" alt={product.name} />
                                    </div>
                                    <div className="col-xl-8">
                                        <div className="card-body">
                                            <h4>{product.name}</h4>
                                            <If condition={product.discountPercentage}>
                                                <h3><span className="badge badge-success">{product.discountPercentage} OFF</span></h3>
                                            </If>
                                            <If condition={product.actualPrice!==product.regularPrice}>
                                                de&nbsp;<span className="product__old-price">{product.regularPrice}</span>
                                            </If>
                                            <p>
                                                por&nbsp;<span className="product__price">{product.actualPrice}</span>
                                            </p>
                                            <p className="card-text">em&nbsp;até&nbsp;<span className="product__installments">{product.installments}</span></p>
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
                                                <div className="alert alert-warning text-center" role="alert">
                                                    Indisponível!
                                                </div>
                                                <div className="alert alert-light text-center shadow-sm" role="alert">
                                                    <i className="fa fa-envelope"></i> Avise-me quando chegar
                                                </div>
                                            </If>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="row no-gutters">
                                    <div className="col-12">
                                        <div className="card-body">
                                            <h4 className="border-bottom mb-3">Detalhes</h4>
                                            <div className="mb-2">{product.name}</div>
                                            <div><strong>Modelagem:&nbsp;&nbsp;</strong>Não informado.</div>
                                            <div><strong>Material:&nbsp;&nbsp;</strong>Não informado.</div>
                                            <div><strong>Composição:&nbsp;&nbsp;</strong>Não informado.</div>
                                            <div><strong>Tipo de Tecido:&nbsp;&nbsp;</strong>Não informado.</div>
                                            <div><strong>Lavagem:&nbsp;&nbsp;</strong>Não informado.</div>
                                            <div><strong>Medidas da Peça:&nbsp;&nbsp;</strong>Não informado.</div>
                                            <div><strong>Medidas da Modelo:&nbsp;&nbsp;</strong>Não informado.</div>
                                            <h4 className="border-bottom mt-4 mb-3">Informações</h4>
                                            <div><strong>Marca:&nbsp;&nbsp;</strong>Não informado.</div>
                                            <div><strong>Modelo:&nbsp;&nbsp;</strong>Não informado.</div>
                                            <div><strong>Cor:&nbsp;&nbsp;</strong>{product.color}</div>
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
