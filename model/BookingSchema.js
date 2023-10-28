const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookingSchema = new Schema({
    carId: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    bookingCount: {
        type: Number,
        default: 1
    }

}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);
// Booking.find({}).then(bookings => console.log(bookings, "<<<<<<<<<<<<"))

module.exports = Booking;