// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
    statusCode?: number;
    details?: any;
}

export function notFound(req: Request, res: Response, next: NextFunction) {
    const error: AppError = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
}

export function errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(`[${new Date().toISOString()}]`, err);

    const statusCode = err.statusCode || 500;
    const message =
        statusCode === 500 ? "Internal Server Error" : err.message;

    res.status(statusCode).json({
        success: false,
        message,
        details: err.details || undefined,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
}
