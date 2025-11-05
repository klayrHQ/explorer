import { create } from 'zustand';
import { safeLocalStorage } from '../utils/helpers/dataHelpers.tsx';
import { useEffect } from 'react';

interface SettingsType {
  currency: {
    mantissaSize: number | string;
    decimalSeparator: string;
    formatting: string[];
    trailingZeroes: boolean;
  };
}

interface SettingsStoreProps {
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;
  setSetting: <K extends keyof SettingsType>(key: K, value: Partial<SettingsType[K]>) => void;
}

export const useSettingsStore = create<SettingsStoreProps>((set) => {
  return {
    settings: {
      currency: {
        mantissaSize: 3,
        decimalSeparator: 'Comma',
        formatting: ['Symbol'],
        trailingZeroes: false,
      },
    },
    setSettings: (settings: SettingsType) => set({ settings }),
    setSetting: <K extends keyof SettingsType>(key: K, value: Partial<SettingsType[K]>) =>
      set((state) => {
        const newSettings = { ...state.settings };
        newSettings[key] = { ...newSettings[key], ...value };
        safeLocalStorage.setItem('settings', JSON.stringify(newSettings));
        return { settings: newSettings };
      }),
  };
});

export const useSettings = () => {
  const settings = useSettingsStore((state) => state.settings);
  const setSettings = useSettingsStore((state) => state.setSettings);
  const setSetting = useSettingsStore((state) => state.setSetting);

  const initializeSettings = () => {
    const initialSettings = safeLocalStorage.getItem('settings');
    if (!initialSettings) return;

    // if settings are in invalid format, remove them
    try {
      setSettings(JSON.parse(initialSettings));
    } catch {
      safeLocalStorage.removeItem('settings');
    }
  };

  useEffect(() => {
    initializeSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSettings]);

  return {
    settings,
    setSetting,
  };
};
