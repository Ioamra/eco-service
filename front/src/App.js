import logo from './logo.svg';
import './App.css';

function App() {
  // EXEMPLE DE GET
  fetch("http://localhost:5000/api/utilisateur/1")
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data);
            console.log(data);
        })

  // EXEMPLE DE POST
  fetch("http://localhost:5000/api/utilisateur/connexion", 
  {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mail: "admin@gmail.com",
      mot_de_passe: "f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cd"
    }),
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.error('Erreur lors de la requête POST:', error);
  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
