import { prisma } from '@/config';

async function getHotelById(id: number) {
  return await prisma.hotel.findFirst({
    where: { id },
    include: {
      rooms: true,
    },
  });
}

async function getHotels() {
  return await prisma.hotel.findMany();
}

const hotelsRepository = {
  getHotels,
  getHotelById,
};

export default hotelsRepository;
