import React, { useState } from 'react';
import logoEcoService from '../assets/logoEcoService.png';
import '../sing-in-up.css';

const LoginScreen = () => {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);

    const toggleForm = () => {
        setLoginFormVisible(!isLoginFormVisible);
    };

    const handleLogin = (userData) => {
        // Logique de connexion ici
        console.log('Utilisateur connecté:', userData);
    };

    const handleRegister = (userData) => {
        // Logique d'inscription ici
        console.log('Utilisateur inscrit:', userData);
    };

    return (
        <div>
            <h1 style={styles.formTitle} className="formTitle">{isLoginFormVisible ? 'Connexion' : 'Inscription'}</h1>
            <div className="sing" style={{background: '#fff', ...styles.sing}}>
                <div>
                    <div style={styles.formLayout} className="formLayout">
                        <div style={styles.logoLayout} className="logoLayout">
                            <img src={logoEcoService} alt="Logo-Eco-Service"/>
                        </div>
                        <div className="formContainer">
                            {isLoginFormVisible ? (
                                <form style={styles.form} className="form" onSubmit={(e) => handleLogin(e)}>
                                    {/* Formulaire de connexion avec des balises label */}
                                    <label>
                                        Email<br/>
                                        <input type="text"/>
                                    </label>
                                    <label>
                                        Mot de passe<br/>
                                        <input type="password"/>
                                    </label>
                                    <button type="submit">Se connecter</button>
                                </form>
                            ) : (
                                <form style={styles.form} className="form" onSubmit={(e) => handleRegister(e)}>
                                    {/* Formulaire d'inscription avec des balises label */}
                                    <label>
                                        Nom<br/>
                                        <input type="text"/>
                                    </label>
                                    <label>
                                        Pr&eacute;nom<br/>
                                        <input type="text"/>
                                    </label>
                                    <label>
                                        Email<br/>
                                        <input type="text"/>
                                    </label>
                                    <label>
                                        Mot de passe<br/>
                                        <input type="password"/>
                                    </label>
                                    <label>
                                        Confirmer le mot de passe<br/>
                                        <input type="password"/>
                                    </label>
                                    <button type="submit">S'inscrire</button>
                                </form>
                            )}
                            <a className="singSwitch" onClick={toggleForm}>
                                {isLoginFormVisible ? "Je ne suis pas encore inscrit" : "J'ai déjà un compte"}
                                </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles définis en tant qu'objet JavaScript
const styles = {
    sing: {
        maxWidth: '800px',
        width: '80vw',
        height: 'max-content',
        minWidth: '300px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
        color:'#000',
        fontSize: '3rem',
        marginBottom: '50px',

    },
    singSwitchContainer: {
        textAlign: 'center',
        background: 'none',
        color: '#000',
    },
    formTitle: {
        textAlign: 'center',
        color: '#153C32',
        fontSize: '6rem',
    },
    formLayout: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        height:'100%',
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        width: '50%',
    },
    logoLayout: {
        height: '100%',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default LoginScreen;
