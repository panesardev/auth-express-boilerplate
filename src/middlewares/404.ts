import { Request, Response, NextFunction } from 'express';

export function notFound(request: Request, response: Response, next: NextFunction) {
	response.status(404).json({ message: 'NOT FOUND' });
}