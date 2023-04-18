import { Enrollment, Payment } from '@prisma/client';
import { prisma } from '@/config';
import { CardData } from '@/protocols';

async function paymentProcess(ticketId: number, cardData: CardData, value: number) {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer: cardData.cardIssuer,
      cardLastDigits: cardData.cardLastDigits,
    },
  });
}

async function findPaymentByTicketId(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}
const paymentsRepository = {
  paymentProcess,
  findPaymentByTicketId,
};

export default paymentsRepository;
