export const stepsContent = [
  {
    title: 'Step 1',
    subtitle: 'Choose your video',
    description:
      'You can upload a video up to 30 seconds long and it will be deleted at the end of the process.',
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
      'Yes, you can choose. Payment helps to maintain powerful servers that accomplish this complex task in an anonymous and automated manner. Only after payment, the video will be sent to the server for processing with the help of artificial intelligence.',
  },
  {
    title: 'Step 4',
    subtitle: 'Wait during processing',
    description:
      'With the help of artificial intelligence, videos can be processed automatically on the server. After the download link expires, the original video and the new video will be deleted.',
  },
];

export const fileContent = {
  text1: 'Upload a file',
  text2: 'or drag and drop (max. size of 100MB)',
  text3: 'Valid formats: mp4, mkv, 3gp, avi, flv, mov, mpeg, webm, wmv',
};

export const emailContent = {
  note:
    'We will not send you any emails other than the link to download the new video from our server. The email is only saved to complete the process. For more details, please check our ',
};

export const stripeContent = {
  button: 'Pay now',
  amount: (number: string): string => `${number} €`,
};

export const waitContent = {
  text:
    'In less than 30 minutes, a new video with hidden faces will be created and a temporary download link will be sent to you via email.',
};
