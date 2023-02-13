import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import httpStatus from "http-status";


export async function getBookingByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBookingByUserId(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function createBookingReserve(req: AuthenticatedRequest, res: Response) {
  const {
    userId,
    body: { roomId },
  } = req;

  try {
    const bookingCreatedId = await bookingService.postBooking(roomId, userId);
    return res.status(httpStatus.OK).send(bookingCreatedId);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
const userId = req.userId;
const roomId = req.body.roomId;
const bookingId = Number(req.params.bookingId);
  try {
    const booking = await bookingService.updateBooking(roomId, bookingId, userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}