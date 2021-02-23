import React, { useRef, useState } from 'react';
import Header from './containers/Header';
import Content from './containers/Content';
import Steps from './containers/Steps';
import Footer from './containers/Footer';
import Legal from './containers/Legal';

const App: React.FC = () => {
  const [isLegal, showLegal] = useState(false);
  const [windowOffset, setWindowOffset] = useState(0);
  const startRef = useRef<HTMLInputElement>(null);
  const scrollToStart = () => {
    startRef.current && startRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const openLegal = () => {
    const offset = window.scrollY;
    setWindowOffset(offset);
    document.body.setAttribute('style', `position: fixed; top: -${offset}px; left:0: right; 0;`);
    showLegal(true);
  };

  const closeLegal = () => {
    document.body.setAttribute('style', '');
    window.scrollTo(0, windowOffset);
    showLegal(false);
  };

  return (
    <>
      <Header />
      <main>
        <Content scroll={scrollToStart} />
        <Steps startRef={startRef} clickLegal={openLegal} />
      </main>
      {isLegal && <Legal fn={closeLegal} />}
      <Footer fn={openLegal} />
    </>
  );
};

export default App;
