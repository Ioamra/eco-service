import React from 'react';
import ProductCardComponent from "../components/produit/productCardComponent";
import './homePage.css';
import homePage from '../assets/homePage.png';


const HomePage = () => {

    return (
        <div className='homepage'>
            <div className='hero-section'>
                <div className='hero-section-column-1'>
                    <h1 className='hero-section-title'>Verdir votre shopping, un clic à la fois.</h1>
                    <h4 className='hero-section-subtitle'>Pour un avenir plus durable, ensemble.</h4>
                    <button className='hero-section-button'>Voir nos produits</button>
                </div>
                <img src={homePage} alt='hero-section' className='hero-section-image'/>
            </div>
            <div className='moment-articles'>
                <h2 className='moment-articles-title' >ARTICLES DU MOMENT</h2>
                <div className='moment-articles-cards'>
                    <ProductCardComponent productId="1"/>
                    <ProductCardComponent productId="2"/>
                    <ProductCardComponent productId="3"/>
                    <ProductCardComponent productId="4"/>
                </div>
            </div>
            <div>
                <h2></h2>
            </div>
        </div>
    );
}

export default HomePage;
