import { TicketType, Ticket } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from '@/config';
import { TicketWithDetails } from '@/protocols';

async function findTicketTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function findTicketTypeById(ticketTypeId: number): Promise<TicketType> {
  return await prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number): Promise<Ticket> {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
    },
  });
}

const ticketsRepository = {
  findTicketTypes,
  createTicket,
  findTicketTypeById,
  findTicketByEnrollmentId,
};

export default ticketsRepository;
