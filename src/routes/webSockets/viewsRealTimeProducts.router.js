import express from 'express';
import ViewsController from '../../controllers/views.controller.js';


const router = express.Router();

// Ver productos en tiempo real con socketServer
router.get('/', ViewsController.realTimeProducts)

export default router;