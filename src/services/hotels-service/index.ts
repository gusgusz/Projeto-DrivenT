import { notFoundError, paymentRequired, unauthorizedError } from '@/errors';
import ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository.ts';

async function getHotels(userId: number) {
  await isPossibleHotel(userId);

  const hotels = await hotelsRepository.findHotels();

  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

async function getHotelById(userId: number, hotelId: number) {
  await isPossibleHotel(userId);

  const hotel = await hotelsRepository.findHotelById(hotelId);

  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

async function isPossibleHotel(userId: number) {
  const enrollment = await enrollmentRepository.findByUserWithTicket(userId);
  if (!enrollment) throw notFoundError();
  const ticket = enrollment.Ticket;
  if (!ticket) throw notFoundError();
  const ticketTypeId = await ticketRepository.findTicketTypeById(ticket[0].ticketTypeId);
  if (ticket[0].status !== 'PAID' || ticketTypeId.isRemote || !ticketTypeId.includesHotel) throw paymentRequired();
}

export const hotelsService = {
  getHotels,
  getHotelById,
};
