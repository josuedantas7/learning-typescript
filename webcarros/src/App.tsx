import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import CarDetail from "./pages/car";
import Home from "./pages/home";
import New from './pages/dashboard/new'

import Header from "./components/header";
import Container from "./components/Container";

import AuthProvider from "./contexts/AuthContext";
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {
  return (
    <Router>
      <PrimeReactProvider>
        <AuthProvider>
          <Header />
          <Container>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/new" element={<New />} />
                <Route path="/car/:id" element={<CarDetail />} />
            </Routes>
          </Container>
        </AuthProvider>
      </PrimeReactProvider>
    </Router>
  );
};

export default App;
