import { NextFunction, Request, Response } from 'express';

export const cors: Function = () => (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');

    if (req.method === 'OPTIONS') {
        res.status(204);
    }

    next();
};
