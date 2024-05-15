import { Router } from 'express';
import authUserTgData from '../lib/middlewares/authUserTgData';

const router = Router();

router.use('/user', authUserTgData, require('./users'));
router.use('/mint', require('./mint'))
router.use('/transfer', require('./transfer'))

module.exports = router;
