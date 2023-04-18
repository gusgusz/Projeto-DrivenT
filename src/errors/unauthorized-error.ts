import { ApplicationError } from '@/protocols';

export function unauthorizedError(message?: string): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: message ? message : 'You must be signed in to continue',
  };
}
