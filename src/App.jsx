import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import MyPokemon from './pages/MyPokemon/MyPokemon';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:slug" element={<Details />} />
          <Route path="/my-pokemon/" element={<MyPokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;