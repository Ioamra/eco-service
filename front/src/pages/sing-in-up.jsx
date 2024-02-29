import React, { useState } from 'react';
import logoEcoService from '../assets/logoEcoService.png';
import './sing-in-up.css';
import { connexion, inscription } from '../services/utilisateur';

const LoginScreen = () => {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);

    const toggleForm = () => {
        setLoginFormVisible(!isLoginFormVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response =  await connexion(e.target.elements.email.value, e.target.elements.password.value);
        if (response == 'ok') {
            // ! GERER LA REDIRECTION QUAND LA CONNEXION A REUSSI
        } else if (response == 'error' ) {
            alert("Une erreur s'est produite, veuillez réessayer.")
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (e.target.elements.password.value == e.target.elements.password2.value) {
            const response = await inscription(
                e.target.elements.mail.value,
                e.target.elements.prenom.value,
                e.target.elements.nom.value,
                e.target.elements.password.value,
                e.target.elements.pays.value,
                e.target.elements.ville.value,
                e.target.elements.code_postal.value,
                e.target.elements.complement_adresse.value
            );
            if (response == 'ok') {
                // ! GERER LA REDIRECTION QUAND LA CONNEXION A REUSSI
            } else if (response == 'error' ) {
                alert("Une erreur s'est produite, veuillez réessayer.")
            }
        } else {
            alert('Les mots de passe ne corresponde pas.')
        }
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
                                        <input type="text" name="email" required/>
                                    </label>
                                    <label>
                                        Mot de passe<br/>
                                        <input type="password" name="password" required/>
                                    </label>
                                    <button type="submit">Se connecter</button>
                                </form>
                            ) : (
                                <form style={styles.form} className="form" onSubmit={(e) => handleRegister(e)}>
                                    {/* Formulaire d'inscription avec des balises label */}
                                    <label>
                                        Nom<br/>
                                        <input type="text" name="nom" required/>
                                    </label>
                                    <label>
                                        Pr&eacute;nom<br/>
                                        <input type="text" name="prenom" required/>
                                    </label>
                                    <label>
                                        Email<br/>
                                        <input type="text" name="mail" required/>
                                    </label>
                                    <label>
                                        Mot de passe<br/>
                                        <input type="password" name="password" required/>
                                    </label>
                                    <label>
                                        Confirmer le mot de passe<br/>
                                        <input type="password" name="password2" required/>
                                    </label>
                                    <label>
                                        Pays<br/>
                                        <input type="text" name="pays" required/>
                                    </label>
                                    <label>
                                        Ville<br/>
                                        <input type="text" name="ville" required/>
                                    </label>
                                    <label>
                                        Code postal<br/>
                                        <input type="text" name="code_postal" required/>
                                    </label>
                                    <label>
                                        Complement d'adresse<br/>
                                        <input type="text" name="complement_adresse" required/>
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
        fontSize: '2em',
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
        padding: '30px',
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
