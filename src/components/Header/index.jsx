import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/logo512.png';

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link to="/home" className="navbar-brand">
                    <img src={logo} alt="Logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="ml-auto my-2 my-lg-0">
                        <span className="navbar-icon-button">
                            <i className="fa fa-2x fa-user-circle-o"></i>
                        </span>
                        <Link to="/cart" className="navbar-icon-button">
                            <i className="fa fa-2x fa-shopping-cart"></i>
                        </Link>
                    </div>
                </div>
            </nav>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
            </nav>
        </header>
    );
}
