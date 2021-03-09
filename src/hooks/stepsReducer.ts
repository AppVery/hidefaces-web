import { ModalData } from '../containers/Modal';

export enum Types {
  okData = 'OK_DATA',
  errorData = 'ERROR_DATA',
  okSession = 'OK_STRIPE_SESSION',
  okFinal = 'OK_FINAL',
  errorFinal = 'ERROR_FINAL',
}

type Action =
  | { type: Types.okData }
  | { type: Types.errorData; stepsWithError: number[] }
  | { type: Types.okSession }
  | { type: Types.okFinal; id: string; email: string }
  | { type: Types.errorFinal };

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
        html: 'Starting video upload and payment process',
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
        close: true,
      };
    }

    case Types.okSession:
      return {
        title: 'Start video upload',
        html: 'Uploading file to server',
        error: false,
        loading: true,
      };

    case Types.okFinal:
      return {
        title: 'Satisfactory upload',
        html: 'Redirecting to the payment gateway',
        error: false,
        loading: false,
      };

    case Types.errorFinal:
      return {
        title: 'Unexpected error',
        html: `Please try again in a few minutes or contact <strong>info@hidefaces.app</strong>`,
        error: true,
        loading: false,
        close: true,
      };

    default:
      return state;
  }
};
