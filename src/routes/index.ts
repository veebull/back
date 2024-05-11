import { Router } from 'express';
import authUserTgData from 'src/lib/middlewares/authUserTgData';

const router = Router();

router.use('/user', authUserTgData, require('./users'));

module.exports = router;
