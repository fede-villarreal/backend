import { Router } from "express";
import passport from "passport";
import { isAuth } from '../../config/passport.config.js';
import SessionController from "../../controllers/session.controller.js";

const router = Router();

// Registrar usuario:
router.post('/register', passport.authenticate('register', { successRedirect: '/', failureRedirect: '/failregister' }))

// Loguear usuario:
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', failureFlash: true }), SessionController.login)

// Cerrar sesión:
router.get('/logout', SessionController.logout)

// Loguear con GitHub:
router.get('/github', passport.authenticate('github', { scope: ['user: email'] }))
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), SessionController.githubCallback)

// Mostrar usuario:
router.get('/current', isAuth, SessionController.current)

export default router;