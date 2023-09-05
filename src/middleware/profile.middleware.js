export const userAuth = (req, res, next) => {
    if (req.session.user.rol !== 'user') return res.status(403).send('Acceso no autorizado: requiere un perfil de USUARIO para utilizar este servicio')
    return next()
}

export const adminAuth = (req, res, next) => {
    if (req.session.user.rol !== 'admin') return res.status(403).send('Acceso no autorizado: requiere un perfil de ADMINISTRADOR para utilizar este servicio')
    return next()
}