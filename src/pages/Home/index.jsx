import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchProducts} from '../../api/services';
import {updatePageTitle} from '../../other/utils';

export default function Home() {
    const dispatch = useDispatch();
    const [products, updateProducts] = useState([]);

    async function fetchData() {
        try {
            const response = await fetchProducts();
            updateProducts(response.data.products);
        } catch (error) {
            console.error(error.message);
        }
    }

    function renderProducts() {
        return products.map((product) => (
            <div className="col-xl-4" key={product.code_color}>
                <Link to={`/product/${product.code_color}`}>
                    <div className="card">
                        <img src={product.image} className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text text-center">{product.name}</p>
                            <h5 className="card-title">{product.actual_price}</h5>
                            <h5 className="card-title">{product.regular_price}</h5>
                            <p className="card-text">{product.installments}</p>
                        </div>
                    </div>
                </Link>
            </div>
        ));
    }

    useEffect(() => {
        updatePageTitle('Produtos');
        fetchData();
    }, []);

    return (
        <main>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        {renderProducts()}
                    </div>
                </div>
            </section>
        </main>
    );
}
