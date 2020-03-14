import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Card from '../../components/Card';
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
                <Card
                    id={product.code_color} 
                    imageUrl={product.image} 
                    name={product.name} 
                    actualPrice={product.actual_price} 
                    regularPrice={product.regular_price} 
                    installments={product.installments} 
                    discountPercentage={product.discount_percentage}
                />
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
