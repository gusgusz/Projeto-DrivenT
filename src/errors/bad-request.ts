import { ApplicationError } from '@/protocols';

export function badRequest(message: string): ApplicationError {
  return {
    name: 'BadRequest',
    message,
  };
}
