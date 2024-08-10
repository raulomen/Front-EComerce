import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProduct = () => {
    const [productName, setProductName] = useState('');
    const [productValue, setProductValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/product', {
                name: productName,
                value: productValue
            });

            console.log('Product created:', response.data);
            setProductName('');
            setProductValue('');

            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="productName">Nombre del Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="productValue">Valor</label>
                    <input
                        type="number"
                        className="form-control"
                        id="productValue"
                        value={productValue}
                        onChange={(e) => setProductValue(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Producto</button>
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate('/dashboard')}
                >
                    Volver al Dashboard
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
