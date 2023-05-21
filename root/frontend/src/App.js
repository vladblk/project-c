import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AllCamps from './components/AllCamps';
import CampDetail from './components/CampDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AllProducts from './components/AllProducts';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/camps" exact element={<AllCamps />} />
          <Route path="/camps/:campID" exact element={<CampDetail />} />
          <Route path="/signin" exact element={<SignIn />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/products" exact element={<AllProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
