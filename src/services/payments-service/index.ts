import { TicketType, Ticket } from '@prisma/client';
import dayjs from 'dayjs';
import { CardData } from '@/protocols';
import ticketsRepository from '@/repositories/tickets-repository';
import { badRequest, notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payments-repository';
import { processPaymentSchema } from '@/schemas';

async function processPayment(ticketId: number, cardData: CardData, userId: number) {
  const validate = processPaymentSchema.validate(cardData);
  if (validate.error) {
    const erro = validate.error.details.map((d) => d.message);
    throw badRequest(erro[0]);
  }

  const ticket = await ticketsRepository.findJustTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const { price } = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId);
  const value = price;
  await ticketsRepository.updateState(ticketId);

  const payment = await paymentsRepository.paymentProcess(ticketId, cardData, value);

  return payment;
}

async function getPayment(ticketId: number, userId: number) {
  const payment = await paymentsRepository.findPaymentByTicketId(ticketId);
  const ticketReq = await ticketsRepository.findTicketById(ticketId);

  if (!payment || !ticketReq) throw notFoundError();
  const enrollment = await enrollmentRepository.findEnrollmentByUser(userId);
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (ticket.id !== ticketId) throw unauthorizedError();

  return payment;
}

export const paymentsService = {
  processPayment,
  getPayment,
};
