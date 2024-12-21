import { createUseStorage } from './create-use-storage';

export const useLocalStorage = createUseStorage(window.localStorage);

export const useSessionStorage = createUseStorage(window.sessionStorage);
