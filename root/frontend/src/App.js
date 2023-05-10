import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AllCamps from './components/AllCamps';
import CampDetail from './components/CampDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/camps" exact element={<AllCamps />} />
          <Route path="/camps/:campID" exact element={<CampDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;