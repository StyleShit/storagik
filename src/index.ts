import { createUseStorage } from './create-use-storage';

export const useLocalStorage = createUseStorage(localStorage);

export const useSessionStorage = createUseStorage(sessionStorage);
