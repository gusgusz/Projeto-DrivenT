import { Booking } from '@prisma/client';
import { prisma } from '@/config';

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
  });
}

async function postBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      User: {
        connect: { id: userId },
      },
      Room: {
        connect: {
          id: roomId,
        },
      },
    },
  });
}

async function updateBooking(id: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id,
    },
    data: {
      Room: {
        connect: {
          id: roomId,
        },
      },
    },
  });
}

const bookingsRepository = {
  findBookingByUserId,
  postBooking,
  updateBooking,
};

export default bookingsRepository;
