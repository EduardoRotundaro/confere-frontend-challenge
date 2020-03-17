import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import If from '../../components/If';
import CartItem from '../../components/CartItem';
import {
    clearCartStore,
    removeItemOfCartStore,
} from '../../redux/actions/cart';

export default function Cart() {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => ({
        products: state.cart.products,
    }));

    function renderList() {
        return products && products.map(({name, image, actualPrice, size, codeColor}, index)=> (
            <div className="col-12" key={codeColor}>
                <CartItem 
                    id={codeColor}
                    image={image}
                    name={name}
                    actualPrice={actualPrice}
                    size={size}
                    removeFromCart={(id) => dispatch(removeItemOfCartStore(id))}
                />
            </div>
        ));
    }

    function getTotalPrice() {
        const floatPrices = products.map((p) => p.actualPrice).map((p) => parseFloat(p.split(' ')[1].replace(',','.')));
        const floatTotal = floatPrices.length? floatPrices.reduce((total, num) => (total + num)) : 0.0;
        return `R$ ${floatTotal.toFixed(2)}`;
    }

    return (
        <main>
            <section>
                <div className="container">
                    <div className="row justify-content-center mb-4 mt-4">
                        <div className="col-xl-6">
                            <button 
                                type="button"
                                className="btn btn-block btn-danger"
                                onClick={() => dispatch(clearCartStore())}
                                disabled={!products.length}
                            >
                                Limpar carrinho
                            </button>
                        </div>
                    </div>
                    <If condition={products.length}>
                        <div className="row justify-content-center">
                            {renderList()}
                        </div>
                    </If>
                    <If condition={!products.length}>
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                <div className="alert alert-warning" role="alert">O carrinho está vazio</div>
                            </div>
                        </div>
                    </If>
                    <div className="row justify-content-center mb-4 mt-4 border-top">
                        <div className="col-12 text-right">
                            <h2 className="">{getTotalPrice()}</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-6 mb-1">
                            <Link to="home" className="btn btn-block btn-primary">Continuar comprando</Link>
                        </div>
                        <div className="col-xl-6 mb-1">
                            <button 
                                type="button" 
                                className="btn btn-block btn-success"
                                disabled={!products.length}
                            >
                                Finalizar compra
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
