import { Request, Response, NextFunction } from 'express';

export function logger(request: Request, response: Response, next: NextFunction) {
	console.log(`${request.method} ${request.path} ${new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`);
	next();
}