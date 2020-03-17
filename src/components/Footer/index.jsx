import React from 'react';
import {APP_VERSION} from '../../other/constants';

export default function Footer() {
    return (
        <footer className="bg-secondary text-white mt-4 pt-4 pb-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">COPYRIGHT © 2020 Todos os direitos reservados.</div>
                    <div className="col-12 text-center"><strong>CNPJ: 33.825.161/0001-73</strong></div>
                    <div className="col-12 text-center">
                        Feito por <a href="https://github.com/EduardoRotundaro" target="_blank" rel="noopener noreferrer">Eduardo H. Rotundaro</a>
                    </div>
                    <div className="col-12 text-center">
                        <small>v{APP_VERSION}</small>
                    </div>
                </div>
            </div>
        </footer>
    );
}
