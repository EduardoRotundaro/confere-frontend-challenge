import React from 'react';
import {APP_VERSION, GITHUB_PROFILE} from '../../other/constants';

export default function Footer() {
    return (
        <footer className="bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">COPYRIGHT © 2020 Todos os direitos reservados.</div>
                    <div className="col-12 text-center">CNPJ: 33.825.161/0001-73</div>
                    <div className="col-12 text-center">
                        Feito por <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">Eduardo H. Rotundaro</a>
                    </div>
                    <div className="col-12 text-center">
                        <small>v{APP_VERSION}</small>
                    </div>
                </div>
            </div>
        </footer>
    );
}
