import { TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function findTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  findTicketTypes,
};

export default ticketsRepository;
