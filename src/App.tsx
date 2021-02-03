import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Steps from './components/Steps';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Content />
        <Steps />
      </main>
      <Footer />
    </>
  );
};

export default App;
