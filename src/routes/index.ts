import { Router } from 'express';

const router = Router();

router.use('/user', require('./users'));

module.exports = router;
