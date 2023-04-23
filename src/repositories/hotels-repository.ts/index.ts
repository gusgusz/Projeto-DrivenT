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

const hotelsRepository = {
  findHotels,
  findHotelById,
};

export default hotelsRepository;
