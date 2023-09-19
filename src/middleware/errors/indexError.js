import EErrors from "../../services/errors/enums.js";

export default (error, req, res, next) => {
    req.logger.info(error.cause)

    switch(error.code) {

        case EErrors.BAD_REQUEST:
            res.send({status: 'error', error: error.name, code: error.code, message: error.message, cause: error.cause})
            break;

        case EErrors.UNAUTHORIZED:
            res.send({status: 'error', error: error.name, code: error.code, message: error.message, cause: error.cause})
            break;

        case EErrors.FORBIDDEN:
            res.send({status: 'error', error: error.name, code: error.code, message: error.message, cause: error.cause})
            break;

        case EErrors.NOT_FOUND:
            res.send({status: 'error', error: error.name, code: error.code, message: error.message, cause: error.cause})
            break;

        case EErrors.INTERNAL_SERVER_ERROR:
            res.send({status: 'error', error: error.name, code: error.code, message: error.message, cause: error.cause})
            break;

        default:
            res.send({status: 'error', error: 'Unhandled error'})
    }
}