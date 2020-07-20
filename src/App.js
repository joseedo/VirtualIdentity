import React from 'react';
import './App.css';
import NavBar from './HeaderComponent/NavBar';
import MainBody from './MainBody';
import Footer from './FooterComponent/Footer';


function App() {
  return (
    <div className="App">
     <NavBar />
     <MainBody />
     <Footer />
    </div>
  );
}

export default App;
