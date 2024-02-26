import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><NavLink className="adminLink" to="/dashboard">Tableau de bord</NavLink></li>
                <li><NavLink className="adminLink" to="/products">Produits</NavLink></li>
                <li><NavLink className="adminLink" to="/orders">Commandes</NavLink></li>
            </ul>
        </div>
    );
};

export default Sidebar;
