import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingsService from "@/services/bookings-service"
import httpStatus from "http-status";

// export async function getHotels(req: AuthenticatedRequest, res: Response) {
//   const { userId } = req;

//   try {
//     const booking = await bookingsService.createBookingReserve(Number(userId));
//     return res.status(httpStatus.OK).send(booking);
//   } catch (error) {
//     if (error.name === "NotFoundError") {
//       return res.sendStatus(httpStatus.NOT_FOUND);
//     }
//     return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
//   }
// }

export async function createBookingReserve(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  if(!roomId || !isNaN(roomId)){
    return res.sendStatus(httpStatus.BAD_REQUEST);
    }

  try {
    const booking = await bookingsService.createBookingReserve(Number(userId), Number(roomId));
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}
