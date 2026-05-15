const STORAGE_KEY = 'focusflow.onboarded';

export const markOnboarded = () => {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // ignore
  }
};

export const isOnboarded = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};
