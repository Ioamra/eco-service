import React from 'react';
import './footer.css'
import plantImage from './BouteilleEco.png'; 
import twitterLogo from './twitter.svg';
import instagramLogo from './instagram.svg';
import facebookLogo from './facebook.svg';

function Footer() {
    return (
        
        <footer className="footer">
            <img className="footer-img" src={plantImage} alt="Eco Service"/>
            <section className="footer-top">
                <p className="footer-title">
                    ECO SERVICE
                </p>
            </section>
            <hr/>
            <section className="footer-bot">
                <section className="footer-media">
                    <img src={twitterLogo} alt="twitter" className="footer-twitter" />
                    <img src={instagramLogo} alt="instagram" className="footer-instagram" />
                    <img src={facebookLogo} alt ="facebookLogo" className="footer-facebook" />
                </section>
                <section className="footer-text-content">
                    <p>© 2024 Tous droits réservés.</p>
                    <p>Mentions Légales.</p>
                </section>
            </section>
        </footer>
    );
}

export default Footer;