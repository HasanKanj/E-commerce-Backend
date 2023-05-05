import express from 'express';
import {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservationById,
    deleteReservationById
} from '../controllers/reservationController.js';

const router = express.Router();
import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

// Create a new reservation
router.post('/',authenticateToken, createReservation);

// Get all reservations
router.get('/',
// authenticateToken,
// isAdmin,
 getAllReservations);

// Get a reservation by ID
router.get('/:id',authenticateToken,isAdmin, getReservationById);

// Update a reservation by ID
router.put('/:id',authenticateToken,isAdmin, updateReservationById);

// Delete a reservation by ID
router.delete('/:id',authenticateToken,isAdmin, deleteReservationById);

export default router;

