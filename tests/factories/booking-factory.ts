import faker from "@faker-js/faker";
import { prisma } from "@/config";
import dayjs from "dayjs";




export async function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
    include: {
      Room: true,
    },
  });
}
export async function getBookingByUserId(id: number){
    const booking = await prisma.booking.findFirst({
        where: {
            userId: id,
        }
    });
    return booking

}