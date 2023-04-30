import { prisma } from '@/config';

async function findHotelById(id: number) {
  return await prisma.hotel.findFirst({
    where: { id },
    include: {
      Rooms: true,
    },
  });
}

async function findHotels() {
  return await prisma.hotel.findMany();
}

async function findRoomWithBookings(id: number) {
  return await prisma.room.findFirst({
    where: { id },
    include: {
      Booking: true,
    },
  });
}

const hotelsRepository = {
  findHotels,
  findHotelById,
  findRoomWithBookings,
};

export default hotelsRepository;
