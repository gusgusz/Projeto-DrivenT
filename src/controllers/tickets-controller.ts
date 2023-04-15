import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.getTicketsTypes();
    if (types.length === 0) {
      return res.status(httpStatus.OK).send([]);
    }

    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
