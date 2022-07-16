import express from 'express';
import {
  Create,
  Read,
  byCity,
  byType,
  GetOne,
  Update,
  Destroy,
} from '../controllers/hotelController.js';
import { isAdministrator } from '../helpers.js';
const router = express.Router();

//Hotel Routes
router.post('/', isAdministrator, Create);
router.get('/', Read);
router.get('/byCity', byCity);
router.get('/byType', byType);
router.get('/:id', GetOne);
router.put('/:id', isAdministrator, Update);
router.delete('/:id', isAdministrator, Destroy);

export default router;
