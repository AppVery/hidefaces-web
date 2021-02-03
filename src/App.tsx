import React, { useRef } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Steps from './components/Steps';
import Footer from './components/Footer';

const App: React.FC = () => {
  const startRef = useRef<HTMLInputElement>(null);
  const scrollToStart = () => {
    startRef.current && startRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <Header />
      <main>
        <Content scroll={scrollToStart} />
        <Steps startRef={startRef} />
      </main>
      <Footer />
    </>
  );
};

export default App;
