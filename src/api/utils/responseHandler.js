const responseHandler = async (res, statusCode, data) => {
    const status_Code = parseInt(statusCode)
    return res.status(status_Code).json({
        status: 'success',
        data: data
    });
}

export default responseHandler;
