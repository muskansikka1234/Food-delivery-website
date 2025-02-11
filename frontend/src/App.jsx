import React, { useState } from 'react'
import Navbar from'./Components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder.jsx';
import Footer from './Components/Footer.jsx';
import SigninPopup from './Components/Signin popup/SigninPopup.jsx';
import Verify from './Pages/Verify/Verify.jsx';
import MyOrders from './Pages/MyOrders/MyOrders.jsx';


function App() {

  const[showLogin, setShowLogin] = useState(false)
  
  return (
    <>
    {showLogin?<SigninPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
          <Navbar setShowLogin = {setShowLogin}/>
          <Routes>
            <Route path = '/' element = {<Home/>} />
            <Route path = '/Cart' element = {<Cart/>} />
            <Route path = '/order' element = {<PlaceOrder/>} />
            <Route path = '/verify' element = {<Verify/>} />
            <Route path = '/myorders' element = {<MyOrders/>} />

          </Routes>
    </div>
    <Footer/>
    </>
    
    
  );
}

export default App
