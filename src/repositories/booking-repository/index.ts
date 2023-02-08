import { prisma } from "@/config";
import { Room } from "@prisma/client";
import dayjs from "dayjs";

async function createBooking(userId: number, roomId: number, ) {
    const now : string = dayjs().toISOString();
    
    const booking = await prisma.booking.create({
        data: {
            userId,
            roomId,
            updatedAt: now,
        }
    });
    return booking;
}

async function getRoomById(id: number) {
    const room = await prisma.room.findUnique({
        where: {
            id: id
        }
    });
    return room;
}

async function getBookingsByRoomId(id : number){
    const booking = prisma.booking.findMany({
        where: {
            id: id,
        }
    });

    return booking;
}

async function getUserById(id: number){
    const user = await prisma.user.findFirst({
        where: {
            id: id,
        },
    });
    return user;
}

async function getBookingByUserId(id: number){
    const booking = await prisma.booking.findFirst({
        where: {
            id: id,
        }
    });
    return booking

}

const bookingRepository = {
    getRoomById,
    getBookingsByRoomId,
    getUserById,
    getBookingByUserId,
    createBooking
};

export default bookingRepository;