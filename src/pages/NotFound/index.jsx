import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <main className="home">
            <section>
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-12 mt-4">
                            <div className="jumbotron mt-4">
                                <h1 className="display-4">404</h1>
                                <p className="lead">Página não encontrada.</p>
                                <hr className="my-4"/>
                                <Link to="/home" className="btn btn-primary btn-lg btn-block" role="button">Ir para a página inicial</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
