import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsTypes, postTicket, getTicket } from '@/controllers';
import { PostTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketsTypes)
  .post('/', postTicket)
  .get('/', validateBody(PostTicketSchema), getTicket);

export { ticketsRouter };
