import faker from '@faker-js/faker';
import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

interface HotelWithRooms extends Hotel {
  Rooms: Room[];
}

export async function createHotelWithRooms(): Promise<HotelWithRooms> {
  const hotelWithRooms = await prisma.hotel.create({
    include: {
      Rooms: true,
    },
    data: {
      name: faker.name.findName(),
      image: faker.image.business(),
      Rooms: {
        create: [
          {
            name: 'Quarto 1',
            capacity: 2,
          },
          {
            name: 'Quarto 2',
            capacity: 3,
          },
          {
            name: 'Quarto 3',
            capacity: 1,
          },
        ],
      },
    },
  });

  return hotelWithRooms as HotelWithRooms;
}
