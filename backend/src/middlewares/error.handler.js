import env from "../config/env.config.js";

export default function (error, req, res, next) {
    const status = error.status || 500;
    const message = error.message;
    const path = req.method + " " + req.url;

    console.error({ status, message, path, stack: error.stack });

    const isProduction = env.NODE_ENV === "production";
    const isClientError = status >= 400 && status < 500;
    const response = {
        success: false,
        status,
        message: isProduction && !isClientError ? "Internal server error" : error.message,
    };

    if (!isProduction) {
        response.path = path;
        response.stack = error.stack;
    }

    return res.status(status).json(response);
}