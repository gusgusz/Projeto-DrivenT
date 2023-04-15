import { TicketType } from '@prisma/client';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketsTypes(): Promise<TicketType[]> {
  const tickets: TicketType[] = await ticketsRepository.findTicketTypes();

  return tickets;
}

export const ticketsService = {
  getTicketsTypes,
};
