import Reservation from "../models/reservationModel.js";
import Cars from "../models/carsModel.js";
import User from "../models/userModel.js";

// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { carId } = req.body; // Extract carId from request body
    const userId = res.locals.userId;
    // Fetch car details from Cars model using carId
    const car = await Cars.findById(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Fetch user details from User model using userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new reservation with carId, userId, and other relevant details
    const reservation = new Reservation({
      carId: car._id,
      userId: user._id,
      carName: car.name, // Assuming car model has a 'name' field
      userName: `${user.firstname} ${user.lastname}`, // Assuming user model has 'firstname' and 'lastname' fields
    });
    await reservation.save();

    // Return reservation, car, and user details in the response
    res.status(201).json({
      message: "Reservation created successfully",
      reservation: {
        ...reservation.toObject(),
        car: car.toObject(),
        user: user.toObject(),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to create reservation",
        errorMessage: error.message,
      });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("carId")
      .populate("userId");
    res.status(200).json({ reservations });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to get reservations",
        errorMessage: error.message,
      });
  }
};

// Get a reservation by ID
const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id)
      .populate("carId")
      .populate("userId");
    if (reservation) {
      res.status(200).json({ reservation });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to get reservation",
        errorMessage: error.message,
      });
  }
};

// Update a reservation by ID
const updateReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { carId, userId } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { carId, userId },
      { new: true }
    )
      .populate("carId")
      .populate("userId");
    if (updatedReservation) {
      res
        .status(200)
        .json({
          message: "Reservation updated successfully",
          reservation: updatedReservation,
        });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to update reservation",
        errorMessage: error.message,
      });
  }
};
// Delete a reservation by ID
const deleteReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(id)
      .populate("carId")
      .populate("userId");
    if (deletedReservation) {
      res
        .status(200)
        .json({
          message: "Reservation deleted successfully",
          reservation: deletedReservation,
        });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to delete reservation",
        errorMessage: error.message,
      });
  }
};

export {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationById,
  deleteReservationById,
};
