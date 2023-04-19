import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository, { PaymentParams } from '@/repositories/payments-repository';
import ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getPaymentByTicketId(userId: number, ticketId: number) {
  const ticket = await ticketRepository.findJustTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findEnrollmentByUser(userId);

  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function paymentProcess(ticketId: number, userId: number, cardData: CardPaymentParams) {
  const ticketReq = await ticketRepository.findJustTicketById(ticketId);

  if (!ticketReq) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findEnrollmentById(ticketReq.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const ticket = await ticketRepository.findTickeWithTypeById(ticketId);

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.createPayment(ticketId, paymentData);

  await ticketRepository.updateState(ticketId);

  return payment;
}

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

const paymentService = {
  getPaymentByTicketId,
  paymentProcess,
};

export default paymentService;
