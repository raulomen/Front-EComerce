import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SelectProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [productValue, setProductValue] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalValue, setTotalValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/product');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductChange = (e) => {
        const selected = e.target.value;
        setSelectedProduct(selected);
        const product = products.find(p => p._id === selected);
        if (product) {
            setProductValue(product.value);
            calculateTotalValue(quantity, product.value);
        }
    };

    const calculateTotalValue = (qty, value) => {
        const total = (parseFloat(value) || 0) * (parseInt(qty) || 0);
        setTotalValue(total);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            productId: selectedProduct,
            quantity: quantity,
            totalValue: totalValue
        };

        try {
            await axios.post('http://localhost:3000/api/order', orderData);
            console.log('Orden enviada exitosamente');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error enviando la orden:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Seleccionar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="product">Producto</label>
                    <select
                        id="product"
                        className="form-control"
                        value={selectedProduct}
                        onChange={handleProductChange}
                        required
                    >
                        <option value="">Selecciona un producto</option>
                        {products.map(product => (
                            <option key={product._id} value={product._id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="productValue">Valor</label>
                    <input
                        type="number"
                        className="form-control"
                        id="productValue"
                        value={productValue}
                        readOnly
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="quantity">Cantidad</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                            calculateTotalValue(e.target.value, productValue);
                        }}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="totalValue">Total de Valor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="totalValue"
                        value={totalValue}
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
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

export default SelectProduct;
