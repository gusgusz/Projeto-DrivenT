import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services/hotels-service';
import { ticketId } from '@/schemas';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const hotels = await hotelsService.getHotels(userId);

    if (!hotels) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'paymentRequired') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const hotelId = Number(req.params.hotelId);
    if (!hotelId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const hotel = await hotelsService.getHotelById(userId, hotelId);

    if (!hotel) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === 'paymentRequired') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
