import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/create-product" className="btn btn-primary">Crear Producto</Link>
                    </li>
                    <br></br>
                    <li>
                        <Link to="/select-product" className="btn btn-secondary">Seleccionar Producto</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
