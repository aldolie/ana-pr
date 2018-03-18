import { Request, Response, NextFunction } from 'express';
import { Roles } from '../util/Role';

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    if (Roles.isAdmin(req.user.role)) {
    	next();
    } else {
    	res.sendStatus(403);
    }
}