import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
//import CampsPage from './components/CampsPage';
//import CampDetailPage from './components/CampDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          {/* <Route path="/camps" exact component={CampsPage} /> */}
          {/* <Route path="/camps/:id" component={CampDetailPage} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
