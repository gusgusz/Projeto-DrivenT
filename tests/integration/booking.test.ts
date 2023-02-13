import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import { compare } from "bcrypt";
import e from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createEnrollmentWithAddress,
  createUser,
  createTicketType,
  createTicket,
  createPayment,
  generateCreditCardData,
  createTicketTypeWithHotel,
  createTicketTypeRemote,
  createHotel,
  createRoomWithHotelId,
  createBooking,
} from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);


describe("GET / Booking", () => {
it("should respond with status 401 if no token is given", async () => {
  const response = await server.get("/bookings");

  expect(response.status).toBe(httpStatus.UNAUTHORIZED);

});

it("should respond with status 401 if given token is not valid", async () => {
  const token = faker.lorem.word();

  const response = await server.get("/bookings").set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(httpStatus.UNAUTHORIZED);

});

it("should respond with status 401 if there is no session for given token", async () => {

  const userWithoutSession = await createUser();
  const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

  const response = await server.get("/bookings").set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(httpStatus.UNAUTHORIZED);

});

describe("when token is valid", () => {




  it("should respond with status 200 and with existing Booking data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const booking = await createBooking(room.id, user.id);
  
      const response = await server.get("/bookings").set("Authorization", `Bearer ${token}`);
    console.log(response.body);
    expect(response.status).toBe(httpStatus.OK);
     

 
    });

  

});


});

  describe("POST /bookings", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.post("/bookings");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);

    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await server.post("/bookings").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);

    }

    );

    it("should respond with status 401 if there is no session for given token", async () => {
        
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
  
        const response = await server.post("/bookings").set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  
      }

    );

    describe("when token is valid", () => {
      it("should respond with status 200 and with existing Booking data", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const hotel = await createHotel();
        const room = await createRoomWithHotelId(hotel.id);
        const booking = await createBooking(room.id, user.id);
    
        const response = await (await server.post("/bookings")
        .set("Authorization", `Bearer ${token}`).send({
          roomId: room.id}))

        expect(response.status).toBe(httpStatus.OK);
        
        });


      });


  });




        


          


              



   

