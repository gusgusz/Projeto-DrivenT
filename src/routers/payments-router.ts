import { Router } from 'express';
import { handleApplicationErrors, authenticateToken, validateBody } from '@/middlewares';
import { paymentProcess, getPayment } from '@/controllers';
import { processPaymentSchema, ticketId } from '@/schemas';

const paymentsRouter = Router();
paymentsRouter.all('/*', authenticateToken).post('/process', paymentProcess).get('/', getPayment);

export { paymentsRouter };
