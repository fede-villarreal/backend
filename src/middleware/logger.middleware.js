import { devLogger, prodLogger } from "../utils/logger.js";

export const ENVIRONMENT = 'development' // Modificar entorno por 'development' o 'production'

function loggerMiddleware(req, res, next) {
    if (ENVIRONMENT === 'production') {
        req.logger = prodLogger;
    } else {
        req.logger = devLogger;
    }
    next();
}

export default loggerMiddleware;