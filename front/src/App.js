import './App.css';
import LoginScreen from './pages/sing-in-up';
import './index.css';

import Footer from './components/footer/footer'; 
function App() {
  return (
      <div>
        <main>
          <LoginScreen/>
        </main>
        <Footer />
      </div>
  );
}

export default App;