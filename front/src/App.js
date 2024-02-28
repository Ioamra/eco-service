import './App.css';
import LoginScreen from './pages/sing-in-up';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/footer/footer'; 
import Navbar from './components/navbar/navbar';
function App() {
  return (
    <Router>
      <div>
        <Navbar>
          <Routes>
          <Route path="/"/>
          <Route path="/"/>
          <Route path="/"/>
          <Route path="/"/>
        </Routes>
        </Navbar>
        <main>
          <LoginScreen/>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;