import express from 'express';
import { oauthHandler } from './auth';
import mdlHandler from './commands';

const router = new express.Router();

router.get('/oauth', oauthHandler);
router.post('/', mdlHandler);

export default router;
