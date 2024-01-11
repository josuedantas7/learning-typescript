import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Home from "./App";
import Product from "./pages/Product";
import Header from "./components/Header";
import Container from './components/Container'
import Carrinho from "./pages/Carrinho";

function App(){
    return(
        <CartProvider>
            <Router>
                <Header/>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/produto/:id" element={<Product />} />
                        <Route path="/carrinho" element={<Carrinho/>} />
                    </Routes>
                </Container>
            </Router>
        </CartProvider>
    )
}

export default App;