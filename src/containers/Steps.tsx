import React from 'react';
import { useModal } from '../hooks/useModal';
import { useSteps } from '../hooks/useSteps';
import Modal from './Modal';
import Step from '../components/Step';
import File from '../components/File';
import Email from '../components/Email';
import Payment from '../components/Payment';
import timerIcon from '../svg/timer.svg';
import { stepsContent, waitContent } from '../content/steps';

const Steps: React.FC<{
  scrollRef: React.RefObject<HTMLElement>;
  fn: () => void;
}> = ({ scrollRef, fn: openLegalModal }) => {
  const [isNoticesModal, openNoticesModal, closeNoticesModal] = useModal();
  const [data, handlers] = useSteps(openNoticesModal);
  const { modalData, file, email } = data;
  const { setFile, setEmail, handlePay } = handlers;

  return (
    <section ref={scrollRef} className="bg-gray-200 py-2 mt-10">
      {isNoticesModal && <Modal data={modalData} fn={closeNoticesModal} />}
      <form>
        <Step content={stepsContent[0]} topBorder={false} ready={!!file}>
          <File file={file} setFile={setFile} />
        </Step>
        <Step content={stepsContent[1]} ready={!!email}>
          <Email email={email} setEmail={setEmail} fn={openLegalModal} />
        </Step>
        <Step content={stepsContent[2]}>
          <Payment handlePay={handlePay} />
        </Step>
        <Step content={stepsContent[3]}>
          <div className="flex items-center">
            <img className="h-12 w-12" src={timerIcon} alt="Timer Icon" />
            <span className="ml-4 text-base leading-6 font-medium text-gray-500">
              {waitContent.text}
            </span>
          </div>
        </Step>
      </form>
    </section>
  );
};

export default Steps;
