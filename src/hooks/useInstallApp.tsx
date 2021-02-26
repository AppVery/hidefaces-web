import { useEffect, useState } from 'react';

type Response = [boolean, () => void];

// eslint-disable-next-line
let deferredPrompt: any;

export const useInstallApp = (): Response => {
  const [isInstallable, setInstallable] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      deferredPrompt = e;
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      console.log('INSTALL: Success');
    });
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      return;
    }

    setInstallable(false);
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
  };

  return [isInstallable, installApp];
};
