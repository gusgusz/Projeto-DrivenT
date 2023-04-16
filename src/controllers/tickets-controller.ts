import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest, handleApplicationErrors } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { badRequest } from '@/errors';

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

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;
  try {
    const ticketInserted = await ticketsService.postTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticketInserted);
  } catch (err) {
    console.log(err);
    if (err.name === 'BadRequest') {
      return res.status(httpStatus.BAD_REQUEST).send(err);
    }
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(err);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.body;

  try {
    const ticket = await ticketsService.getTicket(userId);

    return res.status(httpStatus.OK).send(ticket);
  } catch (err) {
    if (err.name === 'badRequest') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (err.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
