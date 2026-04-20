import { v4 as uuidv4 } from "uuid";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

export const makePayment = (_, res) => {
    try {
        setTimeout(() => {
            res.send({
                success: true,
                message: "Payment successful! Ticket(s) booked",
                data: uuidv4()
            });
        }, 2000);
    } catch (err) {
        res.send({ success: false, message: err.message });
    }
};

export const bookShow = async (req, res) => {
    try {
        const newBooking = new Booking({ ...req.body, user: req.userId });
        await newBooking.save();

        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: updatedBookedSeats
        });

        res.send({
            success: true,
            message: "New Booking Done!",
            data: newBooking
        });
    } catch (err) {
        res.send({ success: false, message: err.message });
    };
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId })
            .populate("user")
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies"
                }
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres"
                }
            })
        res.send({
            success: true,
            message: "Successfully fetched all bookings",
            data: bookings
        });
    } catch (err) {
        res.send({ success: false, message: err.message });
    }
};