import axios, { AxiosError } from 'axios';

import { toastError } from '../components/toasts';

type Errors = Error | AxiosError | unknown;

export function errorHandler(error: Errors) {
  if (axios.isAxiosError(error)) {
    toastError(error.message);
  }
}
