import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/NavBar';
import Read from './pages/Read';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
    </Router>
  );
};

export default App;
