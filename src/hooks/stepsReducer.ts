import { ModalData } from '../containers/Modal';

export enum Types {
  okData = 'OK_DATA',
  errorData = 'ERROR_DATA',
  okPayment = 'OK_PAYMENT',
  errorPayment = 'ERROR_PAYMENT',
  okFinal = 'OK_FINAL',
  errorFinal = 'ERROR_FINAL',
}

type Action =
  | { type: Types.okData }
  | { type: Types.errorData; stepsWithError: number[] }
  | { type: Types.okPayment }
  | { type: Types.errorPayment }
  | { type: Types.okFinal; id: string; email: string }
  | { type: Types.errorFinal; id: string };

const getStepErrors = (steps: number[]): { title: string; description: string } => {
  const stepsDescriptions = ['video', 'email', 'credit card'];
  const errorsTitle = steps.map((stepNumber) => `Step ${stepNumber.toString()}`);
  const errorsDescription = steps.map(
    (stepNumber) => `<li>${stepsDescriptions[stepNumber - 1]}</li>`,
  );
  return {
    title: errorsTitle.join(', '),
    description: errorsDescription.join(''),
  };
};

export const stepsReducer = (state: ModalData, action: Action): ModalData => {
  switch (action.type) {
    case Types.okData:
      return {
        title: 'Correct data on all steps',
        html: 'Process payment',
        error: false,
        loading: true,
      };

    case Types.errorData: {
      const errors = getStepErrors(action.stepsWithError);
      return {
        title: `Error on: ${errors.title}`,
        html: `Please check your: <ul><strong>${errors.description}</strong></ul>`,
        error: true,
        loading: false,
      };
    }

    case Types.okPayment:
      return {
        title: 'Satisfactory payment',
        html: 'Start video upload',
        error: false,
        loading: true,
      };

    case Types.errorPayment:
      return {
        title: 'Error with the payment',
        html: `Please try again in a few minutes or contact <strong>info@hidefaces.app</strong>`,
        error: true,
        loading: false,
      };

    case Types.okFinal:
      return {
        title: 'Start video processing',
        html: `The tracking code is: <strong>${action.id}</strong>. In less than 30 minutes, you will receive it via email: <strong>${action.email}</strong>.`,
        error: false,
        loading: false,
      };

    case Types.errorFinal:
      return {
        title: 'Video error',
        html: `Please contact us via <strong>info@hidefaces.app</strong> to request a refund using code: <strong>${action.id}</strong>`,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
};
