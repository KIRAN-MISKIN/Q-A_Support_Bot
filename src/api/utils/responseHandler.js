const responseHandler = async (res, statusCode, data) => {
    const StatusCode = parseInt(statusCode)
    return res.status(StatusCode).json({
        status: 'success',
        data: data
    });
}

export default responseHandler;