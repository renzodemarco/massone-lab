export default function (error, req, res, next) {
    const status = error.status || 500;
    const message = error.message;
    const path = req.method + " " + req.url;

    console.error({ status, message, path })
    return res.status(status).json({ status, message, path, success: false });
}