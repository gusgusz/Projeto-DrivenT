
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import bookingRepository from "@/repositories/booking-repository";
import { notFoundError } from "@/errors";
import { FORBIDDEN } from "http-status";

async function createBookingReserve(roomId:number, userId:number){
    includesBooking(userId);
    roomIsAvaliable(roomId);
    const isAlreadyBooked = bookingRepository.getBookingByUserId(userId);
    if(isAlreadyBooked){
        throw FORBIDDEN;
    }
   

    const booking = await  bookingRepository.createBooking(userId, roomId);


    return booking;




}

async function roomIsAvaliable(roomId: number){
    const room = await bookingRepository.getRoomById(roomId);

    if(!room){
        throw notFoundError();
    }
    const isBooking = await bookingRepository.getBookingsByRoomId(room.id);
    if(room.capacity === isBooking.length){
        throw FORBIDDEN;
    }
    

}

async function includesBooking(userId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
      throw notFoundError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);


  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw FORBIDDEN;
  }

  
    
}