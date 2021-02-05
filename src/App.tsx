import React, { useRef } from 'react';
import Header from './containers/Header';
import Content from './containers/Content';
import Steps from './containers/Steps';
import Footer from './containers/Footer';

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
