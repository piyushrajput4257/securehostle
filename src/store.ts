
import { AppSettings, DEFAULT_SETTINGS } from './types';

const STORAGE_KEY = 'safebrowse_settings';

export const getSettings = (): AppSettings => {
  const settings = localStorage.getItem(STORAGE_KEY);
  return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
};

export const saveSettings = (settings: AppSettings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
