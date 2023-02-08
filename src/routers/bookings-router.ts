import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {createBookingReserve} from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
.all("/*", authenticateToken);
.get("/", createBookingReserve)

export {bookingsRouter};