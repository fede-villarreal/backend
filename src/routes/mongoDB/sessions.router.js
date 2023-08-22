import { Router } from "express";
import passport from "passport";

const router = Router();

// Registrar usuario:
router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), async (req, res) => {
    res.send({status: 'succcess', message: 'User registered'})
})
router.get('/failregister', async (req, res) => {
    console.log('Failed Strategy');
    res.send({error: 'Failed'})
})

// Loguear usuario:
router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'Incorrect Password'})
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        age: req.user.age,
        email: req.user.email,
        rol: 'user'
    }
    res.send({status: 'success', payload: req.user})
})
router.get('/faillogin', async (req, res) => {
    res.send({error: 'failed'})
})

// Cerrar sesión:
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
        res.send('Logout ok!')
    })
})

// Loguear con GitHub:
router.get('/github', passport.authenticate('github', {scope: ['user: email']}), async (req, res) => {})
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/'}), async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
})

export default router;