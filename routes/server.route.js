import express from 'express';

//import controller file
import * as controller from '../controllers/server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
      .post(controller.getMail)
      .get(controller.test)


export default router;

