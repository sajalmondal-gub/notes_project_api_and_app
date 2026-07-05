module.exports = async function notFoundMiddleware(req, res) {
    res.sendJSON(404, {
        success: false,
        error: "NotFoundError",
        message: `The path [${req.method}] ${req.path} does not exist.`
    });
};