import { Router } from "express";
import ViewsController from "../../controllers/views.controller.js";

const router = Router();

// Obtener carrito
router.get('/:cid', ViewsController.getCart)

export default router;