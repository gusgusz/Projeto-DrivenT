import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBooking, postBooking, updateBooking } from '@/controllers';

const bookingsRouter = Router();
bookingsRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', postBooking)
  .post('/:bookingId', updateBooking);

export { bookingsRouter };
