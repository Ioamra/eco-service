import React from 'react';
import './footer.css'
import plantImage from './BouteilleEco.png'; 
import twitterLogo from './Twitter.png';
import instagramLogo from './instagram.png';
import facebookLogo from './facebook.png';

function Footer() {
    return (
        
        <footer className="footer">
            <div className="footer-eco">
                <img src={plantImage} alt="Eco Service" className="footer-plant" />
            </div>
            <div class="footer-title-container">
                <div class="footer-title-Eco">ECO SERVICE</div>
            </div>
            <hr className="footer-hr" ></hr>
            <div className="footer-media">
                <img src={twitterLogo} alt="twitter" className="footer-twitter" />
                <img src={instagramLogo} alt="instagram" className="footer-instagram" />
                <img src={facebookLogo} alt ="facebookLogo" className="footer-facebook" />
            </div>
            <div class="footer-text-content">
                <div class="footer-rights">© 2024 Tous droits réservés.</div>
                <div class="footer-mentions">Mentions Légales.</div>
            </div>
        </footer>
    );
}

export default Footer;