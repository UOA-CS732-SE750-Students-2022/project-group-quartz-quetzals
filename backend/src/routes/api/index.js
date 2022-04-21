import express from 'express';

const router = express.Router();

import comments from './comments';
router.use('/comments', comments);

export default router;