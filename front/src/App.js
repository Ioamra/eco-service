import logo from './logo.svg';
import './App.css';

function App() {
  // EXEMPLE DE GET
  fetch("http://localhost:5000/api/utilisateur/1",
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MSwiZXN0X2FkbWluIjoxLCJpYXQiOjE3MDMyNDIwMTQsImV4cCI6MTcwMzI0NTYxNH0.DvivQFl2_h2jUE10C7ZJPJeTLobRH-_0gtTaHFkQRCQ"
    }
  }
  )
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
