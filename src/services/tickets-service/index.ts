import { TicketType, Ticket } from '@prisma/client';
import dayjs from 'dayjs';
import { TicketWithDetails } from '@/protocols';
import ticketsRepository from '@/repositories/tickets-repository';
import { badRequest, notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTicketsTypes(): Promise<TicketType[]> {
  const tickets: TicketType[] = await ticketsRepository.findTicketTypes();

  return tickets;
}

async function postTicket(userId: number, ticketTypeId: number) {
  if (!ticketTypeId) throw badRequest('ticketTypeId is required');

  const enrollmentId = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentId) {
    throw notFoundError();
  }
  await ticketsRepository.createTicket(ticketTypeId, enrollmentId.id);

  const ticket = ticketsRepository.findTicketByEnrollmentId(enrollmentId.id);

  return ticket;
}

async function getTicket(userId: number): Promise<TicketWithDetails> {
  const enrollment = await enrollmentRepository.findEnrollmentByUser(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

export const ticketsService = {
  getTicketsTypes,
  postTicket,
  getTicket,
};
