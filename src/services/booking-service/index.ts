import { Room } from "@prisma/client";
import { notFoundError, unauthorizedError , forbidden} from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import bookingRepository from "@/repositories/booking-repository";
import { FORBIDDEN } from "http-status";

interface RoomUser {
  id: number;
  Room: Room;
}

async function getBookingByUserId(id: number): Promise<RoomUser> {
  const room = await bookingRepository.getBookingById(id);
  if (!room) throw notFoundError();

  return room;
}

async function postBooking(roomId: number, userId: number) {
  if (!roomId) throw unauthorizedError;

  const ticket = await ticketRepository.findTicketByUserId(userId);
  c

  if (ticket.TicketType.isRemote || ticket.status !== "PAID"|| !ticket.TicketType.includesHotel) throw FORBIDDEN;

  const room = await bookingRepository.getRoom(roomId);
  if (!room) throw notFoundError();

  const noVacanciesInRoom = room.capacity === room.Booking.length;
  if (noVacanciesInRoom) throw forbidden();

  const { id: bookingId } = await bookingRepository.createBooking(roomId, userId);

  return { bookingId };
}

async function updateBooking(roomId: number, bookingId: number, userId: number) {
  if (!roomId) throw unauthorizedError;

  const haveBooking = await bookingRepository.getBookingById(userId);
  if (!haveBooking) throw forbidden();

  const isUserBooking = haveBooking.id === bookingId;
  if (!isUserBooking) throw unauthorizedError();

  const room = await bookingRepository.getRoom(roomId);
  if (!room) throw notFoundError();

  const noVacanciesInRoom = room.capacity === room.Booking.length;
  if (noVacanciesInRoom) throw forbidden();

  const { id: newBookingId } = await bookingRepository.updateBooking(bookingId, roomId);

  return { bookingId: newBookingId };
}

const bookingService = {
  getBookingByUserId,
  postBooking,
  updateBooking,
};

export default bookingService;