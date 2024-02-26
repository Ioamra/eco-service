// App.js

import React from 'react';
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import DashboardPage from './back-office/DashboardPage';
import AdminProductPage from './back-office/AdminProductPage';
import AdminOrderPage from './back-office/AdminOrderPage';
import Sidebar from "../components/back-office/Sidebar";


const backOfficePage = () => {
    return (
        <Router>
            <div className="app">
                <Sidebar/>
                    <div className="page-content">
                        <Routes className="route-page">
                            <Route path="/dashboard" element={<DashboardPage/>}/>
                            <Route path="/products" element={<AdminProductPage/>}/>
                            <Route path="/orders" element={<AdminOrderPage/>}/>
                        </Routes>
                    </div>
                </div>
        </Router>
    );
};

export default backOfficePage;

