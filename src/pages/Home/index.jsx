import React, {useState, useEffect} from 'react';
import Card from '../../components/Card';
import If from '../../components/If';
import Loader from '../../components/Loader';
import {fetchProducts} from '../../api/services';
import {updatePageTitle} from '../../other/utils';

export default function Home() {
    const [products, updateProducts] = useState(null);
    const [filter, updateFilter] = useState('');

    async function fetchData(category=null) {
        try {
            updateProducts(null);
            updateFilter(category || '');
            const products = await fetchProducts(category);
            updateProducts(products);
        } catch (error) {
            updateProducts([]);
            console.error(error.message);
        }
    }

    function renderProducts() {
        return products && products.map((product) => (
            <div className="col-xl-4 mb-4" key={product.code_color}>
                <Card
                    id={product.code_color} 
                    imageUrl={product.image} 
                    name={product.name} 
                    actualPrice={product.actual_price} 
                    regularPrice={product.regular_price} 
                    installments={product.installments} 
                    discountPercentage={product.discount_percentage}
                    sizes={product.sizes}
                    available={product.on_sale}
                />
            </div>
        ));
    }

    useEffect(() => {
        updatePageTitle('Produtos');        
        fetchData();
    }, []);

    return (
        <main className="home">
            <section>
                <div className="container">
                    <div className="row justify-content-center mb-4 pb-3 border-bottom">
                        <div className="col-12">
                            <h1 className="display-4">
                                Feminino
                                <If condition={filter}>
                                    <small className="home__section-label">&nbsp;\&nbsp;{filter==='clothes'? 'Roupas' : 'Acessórios'}</small>
                                </If>
                            </h1>
                        </div>
                        <div className="col-xl-4">
                            <button 
                                type="button" 
                                className="btn btn-sm btn-block btn-primary mb-2"
                                onClick={() => fetchData('clothes')}
                            >
                                Roupas
                            </button>
                        </div>
                        <div className="col-xl-4">
                            <button 
                                type="button" 
                                className="btn btn-sm btn-block btn-primary mb-2"
                                onClick={() => fetchData('accessories')}
                            >
                                Acessórios
                            </button>
                        </div>
                        <div className="col-xl-4">
                            <button 
                                type="button" 
                                className="btn btn-sm btn-block btn-primary mb-2"
                                onClick={() => fetchData()}
                            >
                                Ver tudo
                            </button>   
                        </div>
                    </div>
                    <If condition={products}>
                        <div className="row justify-content-center">
                            {renderProducts()}
                        </div>
                    </If>
                    <If condition={!products}>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <Loader />
                            </div>
                        </div>
                    </If>
                </div>
            </section>
        </main>
    );
}
