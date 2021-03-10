const MAX_MB = '50';
const MAX_SECONDS = '30';

export const stepsContent = [
  {
    title: 'Step 1',
    subtitle: 'Choose your video',
    description: `Upload a file or drag and drop. You can upload a video up to ${MAX_SECONDS} seconds and ${MAX_MB} megabytes long and it will be deleted at the end of the process.`,
  },
  {
    title: 'Step 2',
    subtitle: 'Set destination email',
    description:
      'After the process is over, the email is only used to send you a temporary download link for the new video, as it takes a few minutes.',
  },
  {
    title: 'Step 3',
    subtitle: 'Payment: choose the price to pay',
    description:
      'Yes, you can choose. Payment helps to maintain powerful servers that accomplish this complex task in an anonymous and automated manner. Only after payment, video processing will start with the help of artificial intelligence.',
  },
  {
    title: 'Step 4',
    subtitle: 'Wait during processing',
    description:
      'With the help of artificial intelligence, videos can be processed automatically on the server. After the download link expires, the original video and the new video will be deleted.',
  },
];

export const fileContent = {
  text1: `Max. duration: ${MAX_SECONDS} seconds`,
  text2: `Max. size: ${MAX_MB}MB`,
  text3: 'Valid formats: mp4, mkv, mov, webm',
  dropText: 'Drop the files here...',
  error: 'Please enter valid video file',
  validVideoTypes: ['mp4', 'mkv', 'mov', 'webm'],
};

export const emailContent = {
  error: 'Please enter valid email address',
  note:
    'We will not send you any emails other than the link to download the new video from our server. The email is only saved to complete the process. For more details, please check our ',
  link: 'privacy policy',
};

export const stripeContent = {
  button: 'Pay now',
  amount: (number: number): string => `${(number / 100).toString()} €`,
};

export const waitContent = {
  text:
    'In less than 30 minutes, a new video with hidden faces will be created and a temporary download link will be sent to you via email.',
};
