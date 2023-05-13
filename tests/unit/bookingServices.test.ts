import { Enrollment, TicketStatus, Ticket } from '@prisma/client';
import { ForbiddenError, notFoundError } from '@/errors';
import { bookingService } from '@/services/bookings-service';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import hotelsRepository from '@/repositories/hotel-repository';
import bookingsRepository from '@/repositories/bookings-repository.ts';

const userId = 1;
const user = {
  id: userId,
  email: 'john@example.com',
  password: 'password',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const roomId = 2;
const bookingId = 3;
const TicketTypeWithHotel = {
  id: 1,
  name: 'General Admission',
  price: 100,
  isRemote: false,
  includesHotel: true,
  createdAt: '2023-05-08T12:34:56.789Z',
  updatedAt: '2023-05-08T12:34:56.789Z',
};
const ticket = {
  id: 1,
  ticketTypeId: 1,
  TicketType: TicketTypeWithHotel,
  enrollmentId: 1,
  status: 'PAID',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const enrollment = {
  id: 1,
  name: 'John Doe',
  cpf: '123456789',
  birthday: new Date('1990-01-01'),
  phone: '1234567890',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  Ticket: [
    {
      id: 1,
      ticketTypeId: 1,
      enrollmentId: 1,
      status: TicketStatus.RESERVED,
      createdAt: new Date(),
      updatedAt: new Date(),
      Payment: [
        {
          id: 1,
          ticketId: 1,
          value: 100,
          cardIssuer: 'Visa',
          cardLastDigits: '1234',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ],
};

const enrollmentNoTicket = {
  id: 1,
  name: 'John Doe',
  cpf: '123456789',
  birthday: new Date('1990-01-01'),
  phone: '1234567890',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  Ticket: [{}],
};

const enrollmentWTicket = { ...enrollment, ticket };

const booking = { id: bookingId, Room: {} };

describe('bookingService', () => {
  describe('getBooking', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should throw 404 error when there is no enrollment', async () => {
      jest.spyOn(enrollmentRepository, 'findByUserWithTicket').mockResolvedValueOnce(undefined);

      await expect(bookingService.getBooking(userId)).rejects.toEqual(notFoundError());
    });

    it('should throw 404 error when enrollment does not have a ticket', async () => {
      jest.spyOn(enrollmentRepository, 'findByUserWithTicket').mockResolvedValueOnce(enrollmentNoTicket);

      await expect(bookingService.getBooking(userId)).rejects.toEqual(notFoundError());
    });
  });
});
