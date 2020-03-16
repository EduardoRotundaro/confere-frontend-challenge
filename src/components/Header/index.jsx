import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/logo_b.png';

export default function Header() {
    const itemsInCart = useSelector((state) => (state.cart? state.cart.products.length : 0));

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <Link to="/home" className="navbar-brand">
                    <img src={logo} alt="Logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="ml-auto my-2 my-lg-0">
                        <span className="navbar-icon-button mr-4">
                            <i className="fa fa-2x fa-user-circle-o text-secondary mr-2"></i>Olá, visitante
                        </span>
                        <Link to="/cart" className="navbar-icon-button">
                            <i className="fa fa-2x fa-shopping-cart text-secondary"></i>
                            <span className="badge badge-light">{itemsInCart}</span>
                        </Link>
                    </div>
                </div>
            </nav>
            <nav aria-label="breadcrumb" className="bg-light shadow-sm">
                <ol className="breadcrumb text-white bg-light">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
            </nav>
        </header>
    );
}
