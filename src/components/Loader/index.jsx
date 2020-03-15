import React from 'react';

export default function Loader() {
    return (
        <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Carregando...</span>
        </div>
    );
}
