import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AllCamps from './components/AllCamps';
import CampDetail from './components/CampDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AllProducts from './components/AllProducts';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import ResetPassword from './components/ResetPassword';
import MyPage from './components/MyPage';

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
          <Route path="/success" exact element={<PaymentSuccess />} />
          <Route path="/cancel" exact element={<PaymentCancel />} />
          <Route
            path="/resetPassword/:resetPasswordToken"
            exact
            element={<ResetPassword />}
          />
          <Route path="/me" exact element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
