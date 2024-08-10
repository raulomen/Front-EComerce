import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateProduct from './components/CreateProduct';
import SelectProduct from './components/SelectProduct';

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!authenticated ? <Login setAuthenticated={setAuthenticated} /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/create-product" element={authenticated ? <CreateProduct /> : <Navigate to="/login" />} />
                <Route path="/select-product" element={authenticated ? <SelectProduct /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
