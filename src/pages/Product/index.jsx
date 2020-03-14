import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getProductById} from '../../api/services';
import {updatePageTitle} from '../../other/utils';

export default function Home() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

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

    useEffect(() => {
        updatePageTitle('Produto');
        fetchData();
    }, []);


    function renderProductSizesOptions() {
        return product.sizes && product.sizes.filter(({available}) => available).map(({size, sku}) => (
            <option value={size} key={sku}>{size}</option>
        ));
    }

    return (
        <main>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="row no-gutters">
                                    <div className="col-xl-4">
                                        <img src={product.image} className="card-img" alt="..." />
                                    </div>
                                    <div className="col-xl-8">
                                        <div className="card-body">
                                            <p className="card-text"><small className="text-muted">{product.name}</small></p>
                                            <p className="card-text">{product.discount_percentage}</p>
                                            <h5 className="card-title">{product.actualPrice}</h5>
                                            <h5 className="card-title">{product.regularPrice}</h5>
                                            <p className="card-text">{product.installments}</p>
                                            <p className="card-text">{product.color}</p>
                                            <div className="form-group">
                                                <label htmlFor="productSize">Tamanhos</label>
                                                <select className="form-control" id="productSize">
                                                    {renderProductSizesOptions()}
                                                </select>
                                            </div>
                                            <button type="button" className="btn btn-block btn-primary">Adicionar ao carrinho</button>
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
