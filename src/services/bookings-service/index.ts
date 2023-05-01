import { ForbiddenError, notFoundError, paymentRequired, unauthorizedError } from '@/errors';
import ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository.ts';
import bookingsRepository from '@/repositories/bookings-repository.ts';

async function getBooking(userId: number) {
  const enrollment = await enrollmentRepository.findByUserWithTicket(userId);
  if (!enrollment) throw notFoundError();
  const ticket = enrollment.Ticket;
  if (!ticket) throw notFoundError();
  const ticketTypeId = await ticketRepository.findTicketTypeById(ticket[0].ticketTypeId);
  if (ticket[0].status !== 'PAID' || ticketTypeId.isRemote || !ticketTypeId.includesHotel) throw notFoundError();

  const booking = await bookingsRepository.findBookingByUserId(userId);

  return booking;
}

async function postBooking(userId: number, roomId: number) {
  await isPossibleReserve(userId);

  const room = await hotelsRepository.findRoomWithBookings(roomId);

  if (!room) {
    throw notFoundError();
  }
  if (room.Booking.length >= room.capacity) throw ForbiddenError();

  await bookingsRepository.postBooking(userId, roomId);
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  await isPossibleReserve(userId);

  const room = await hotelsRepository.findRoomWithBookings(roomId);

  if (!room) {
    throw notFoundError();
  }
  if (room.Booking.length >= room.capacity) throw ForbiddenError();

  const pastRoom = await bookingsRepository.findBookingByUserId(userId);
  if (!pastRoom) throw ForbiddenError();
  if (pastRoom.userId !== userId || pastRoom.id !== bookingId) throw ForbiddenError();
  await bookingsRepository.updateBooking(bookingId, roomId);
}

async function isPossibleReserve(userId: number) {
  const enrollment = await enrollmentRepository.findByUserWithTicket(userId);
  if (!enrollment) throw ForbiddenError();
  const ticket = enrollment.Ticket[0];
  if (!ticket) throw ForbiddenError();
  const ticketTypeId = await ticketRepository.findTicketTypeById(ticket.ticketTypeId);
  if (ticket.status !== 'PAID' || ticketTypeId.isRemote || !ticketTypeId.includesHotel) throw ForbiddenError();
}

export const bookingService = {
  getBooking,
  postBooking,
  updateBooking,
};
