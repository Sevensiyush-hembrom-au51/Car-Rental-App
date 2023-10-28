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
    payable_object: {
        amount: { type: Number },
        currency: { type: String }
    }

}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);
// Booking.find({}).then(bookings => console.log(bookings, "<<<<<<<<<<<<"))

module.exports = Booking;