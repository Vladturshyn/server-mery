import express from 'express';

import * as controller from '../controllers/server.controller';

const router = express.Router();

router.route('/')
      .post(controller.getMail)

export default router;

