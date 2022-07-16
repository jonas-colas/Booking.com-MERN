import express from 'express';
import { Read, GetOne, Update, Destroy } from '../controllers/userController.js';
const router = express.Router();
import { isAdministrator, verifyUser } from '../helpers.js';

//User Routes
router.get('/', isAdministrator, Read);
router.get('/:id', GetOne);
router.put('/:id', verifyUser, Update);
router.delete('/:id', verifyUser, Destroy);

export default router;
