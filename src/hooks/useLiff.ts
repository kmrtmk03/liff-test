import { useEffect, useState } from 'react';
import liff from '@line/liff';

export interface LiffState {
  isInit: boolean;
  error: string | null;
  profile: {
    displayName: string;
    pictureUrl?: string;
    userId: string;
  } | null;
}

export const useLiff = () => {
  const [liffState, setLiffState] = useState<LiffState>({
    isInit: false,
    error: null,
    profile: null,
  });

  useEffect(() => {
    const initLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID;
        if (!liffId) {
          throw new Error('LIFF ID is not defined in .env');
        }

        await liff.init({ liffId });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        setLiffState({
          isInit: true,
          error: null,
          profile: {
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            userId: profile.userId,
          },
        });
      } catch (e) {
        setLiffState((prev) => ({
          ...prev,
          isInit: true,
          error: e instanceof Error ? e.message : 'LIFF initialization failed',
        }));
      }
    };

    initLiff();
  }, []);

  return liffState;
};
