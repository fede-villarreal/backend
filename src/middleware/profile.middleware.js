import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { unauthorizedRoleErrorInfo } from '../services/errors/info.js';

export const userAuth = (req, res, next) => {
    if (req.session.user.rol !== 'user') return CustomError.createError({
        name: 'Rol no autorizado',
        cause: unauthorizedRoleErrorInfo(),
        message: 'Acción no disponible',
        code: EErrors.FORBIDDEN
    })
    return next()
}

export const adminAuth = (req, res, next) => {
    if (req.session.user.rol !== 'admin') return CustomError.createError({
        name: 'Rol no autorizado',
        cause: unauthorizedRoleErrorInfo(),
        message: 'Acción no disponible',
        code: EErrors.FORBIDDEN
    })
    return next()
}