import { Router } from 'express';
import { ENVIRONMENT } from '../../middleware/logger.middleware.js';

const router = Router();

// Modificar entorno desde 'src/middleware/logger.middleware.js'

// Testear logger:
router.get('/', (req, res) => {
    req.logger.debug(`Mensaje de tipo debug: ${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`)
    req.logger.http(`Mensaje de tipo http: ${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`)
    req.logger.info(`Mensaje de tipo info: ${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`)
    req.logger.warning(`Mensaje de tipo warning: ${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`)
    req.logger.error(`Mensaje de tipo error: ${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`)
    req.logger.fatal(`Mensaje de tipo fatal: ${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`)

    res.send(`Prueba en el entorno "${ENVIRONMENT}" (modificar entorno desde el middleware)`)
})

export default router;