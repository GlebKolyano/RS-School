import React from 'react';
import './style.scss';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
