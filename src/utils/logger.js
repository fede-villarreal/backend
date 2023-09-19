import winston from "winston";

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
        /* debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5 */
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        http: 'white',
        debug: 'grey'
        /* debug: 'grey',
        http: 'white',
        info: 'blue',
        warning: 'yellow',
        error: 'orange',
        fatal: 'red' */
    }
}

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        })
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './src/errors.log',
            level: 'error', // Logea a partir de nivel error
            format: winston.format.simple()
        })
    ]
});

export { devLogger, prodLogger };
