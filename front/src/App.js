import './App.css';
import LoginScreen from './pages/sing-in-up';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import ProductPage from "./pages/product/productPage";
import HomePage from "./pages/homePage";
function App() {
  return (
    <Router>
      <div>
        <Navbar>
        </Navbar>
            <Routes initial="/">
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/product/:productId"
                    element={({ params }) => (
                        <ProductPage productId={params.productId} />
                    )}
                />
                <Route path="/login" element={<LoginScreen />} />
            </Routes>
          <Footer />
      </div>
    </Router>
  );
}

export default App;