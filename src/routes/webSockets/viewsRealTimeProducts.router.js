import express from 'express';
import { isAuth } from '../../config/passport.config.js';
import { adminAuth } from '../../middleware/profile.middleware.js'
import ViewsController from '../../controllers/views.controller.js';


const router = express.Router();

// Ver productos en tiempo real con socketServer
router.get('/', isAuth, adminAuth, ViewsController.realTimeProducts)

export default router;