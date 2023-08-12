import { Router } from "express";
import userModel from '../../dao/models/user.js';

const router = Router();

// Registrar usuario:
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    const exist = await userModel.findOne({ email });
    if (exist) return res.status(400).send({ status: 'error', error: 'El mail ya se encuentra registrado' })

    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }

    let result = await userModel.create(user);
    res.send({ status: 'success', payload: result, message: 'Usuario registrado con éxito!' })
})

// Loguear usuario:
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {
            name: `CoderHouse`,
            email: 'adminCoder@coder.com',
            age: 9,
            rol: 'admin'
        }
        return res.send({ status: 'success', payload: req.session.user, message: 'Logueado con éxito' })
    }

    const user = await userModel.findOne({ email, password })
    if (!user) return res.status(401).send({ status: 'error', error: 'El mail o la contraseña ingresada son incorrectos' })

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: 'usuario'
    }
    res.send({ status: 'success', payload: req.session.user, message: 'Logueado con éxito' })
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


export default router;