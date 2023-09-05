import { Router } from "express";
import { isAuth } from "../../config/passport.config.js";
import ViewsController from "../../controllers/views.controller.js";

const router = Router();

// Obtener carrito
router.get('/:cid', isAuth, ViewsController.getCart)

export default router;