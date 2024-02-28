import './App.css';
import LoginScreen from './pages/sing-in-up';
import './index.css';
import ProductPage from './pages/product/productPage';

import Footer from './components/footer/footer'; 
function App() {
  return (
      <div>
        <ProductPage productId="1"/>
        <Footer />
      </div>
  );
}

export default App;