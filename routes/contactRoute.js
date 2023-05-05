import express from 'express';
import {
  createContact,
  getAllContacts,
  updateContactById,
  deleteContactById
} from '../controllers/contactController.js';

const router = express.Router();
import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

router.post('/create', createContact);
router.get('/getAll',authenticateToken,isAdmin, getAllContacts);
router.put('/update/:contactId',authenticateToken,isAdmin, updateContactById);
router.delete('/delete/:contactId',authenticateToken,isAdmin, deleteContactById);

export default router;