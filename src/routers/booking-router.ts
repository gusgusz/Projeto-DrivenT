import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {createBookingReserve, getBookingByUser, updateBooking} from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
.all("/*", authenticateToken)
.post("/", createBookingReserve)
.get("/", getBookingByUser)
.put("/:bookingId", updateBooking)

export {bookingsRouter};