import { ApplicationError } from '@/protocols';

export function ForbiddenError(message?: string): ApplicationError {
  return {
    name: 'Forbidden',
    message,
  };
}
