import express from 'express';
import {
  Create,
  Read,
  GetOne,
  Update,
  Destroy,
} from '../controllers/roomController.js';
import { isAdministrator } from '../helpers.js';
const router = express.Router();

//Hotel Routes
router.post('/:hotel_id', isAdministrator, Create);
router.get('/', Read);
router.get('/:id', GetOne);
router.put('/:id', isAdministrator, Update);
router.delete('/:hotel_id/:id', isAdministrator, Destroy);

export default router;
