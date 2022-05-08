import express from 'express';

const router = express.Router();

import comments from './comments';
import radio from "./radio";
router.use('/comments', comments);
router.use('/radio', radio);

export default router;