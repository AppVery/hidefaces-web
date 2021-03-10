import React from 'react';
import Header from './containers/Header';
import Content from './containers/Content';
import Steps from './containers/Steps';
import Footer from './containers/Footer';
import Modal from './containers/Modal';
import { useModal } from './hooks/useModal';
import { useScrollTo } from './hooks/useScrollTo';
import { usePaymentPage } from './hooks/usePaymentPage';
import { legalContent } from './content/legal';

const App: React.FC = () => {
  const [isLegalModal, openLegalModal, closeLegalModal] = useModal();
  const [isPaymentModal, openPaymentModal, closePaymentModal] = useModal();
  const [paymentModalData] = usePaymentPage(openPaymentModal);
  const [startRef, scrollToStart] = useScrollTo();
  const { title, html } = legalContent;

  return (
    <>
      <Header />
      <main>
        <Content scrollTo={scrollToStart} />
        <Steps scrollRef={startRef} fn={openLegalModal} />
      </main>
      {isPaymentModal && <Modal data={paymentModalData} fn={closePaymentModal} />}
      {isLegalModal && (
        <Modal data={{ title, html, close: true }} fn={closeLegalModal} isLongText={true} />
      )}
      <Footer fn={openLegalModal} />
    </>
  );
};

export default App;
