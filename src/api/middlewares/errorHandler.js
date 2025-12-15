import AppError from '../utils/AppError.js'
import config from '../../config/index.js'

const errorHandler = (err, req, res, next) => {
    console.log(err, "checking")
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if (err.name === 'CastError') {
        err = new AppError('Invalid ID format', 400);
    }

    if (err.code === 11000) {
        err = new AppError('Duplicate field value', 400);
    }

    if (err.name === 'ValidationError') {
        err = new AppError(err.message, 400);
    }


    // Development Error Response
    if (config.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err.message,
        })
    }

    // Production Error Response
    if (config.NODE_ENV === 'production') {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }

        console.error('💥 ERROR:', err);

        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
}

export default errorHandler;