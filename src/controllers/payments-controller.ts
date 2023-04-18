import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { paymentsService } from '@/services/payments-service';

export async function getPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!Number(req.params.ticketId)) return res.sendStatus(httpStatus.BAD_REQUEST);

  const ticketId = parseInt(req.params.ticketId);
  const { userId } = req.body;

  try {
    const payment = paymentsService.getPayment(ticketId, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (err) {
    if (err.name === 'BadRequest') {
      return res.status(httpStatus.BAD_REQUEST).send(err);
    }
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(err);
    }
    if (err.message === 'unauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(err);
    }
    next(err);
  }
}

export async function paymentProcess(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { ticketId, cardData } = req.body;

    if (!ticketId || !cardData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const payment = await paymentsService.processPayment(ticketId, cardData, userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (err) {
    next(err);
  }
}
