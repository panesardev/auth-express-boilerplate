import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { checkAuthToken } from './service';
import { findByEmail } from '../user/service';
import { LoginRequest } from './interfaces';
import { UserValidationSchema } from '../models/user';

export async function registerMiddleware(request: Request, response: Response, next: NextFunction) {
	const user: User = request.body;
	// Validation
	const { error } = UserValidationSchema.validate(user);
	
	if (error) 
		return response.status(400).json({ message: error.message });
	
	const userFound = await findByEmail(user.email);
	// User exists
	if (userFound) 
		return response.status(400).json({ message: 'User already exists' });
	
	next();
}

export async function loginMiddleware(request: Request, response: Response, next: NextFunction) {
	const credentials: LoginRequest = request.body;
	const userFound = await findByEmail(credentials.email);
	// User doesn't exists
	if (!userFound) 
		return response.status(400).json({ message: 'Invalid credentials' });

	next();
}

export async function authenticate(request: Request, response: Response, next: NextFunction) {
	const token = request.headers['authorization']?.split(' ')[1];
	try {
		if (!token) throw Error();
		const data: any = checkAuthToken(token);
		request.body.userId = data.id;
	}
	catch (e) {
		response.status(403).json({ message: 'ACCESS DENIED' });
		return;
	}
	
	next();
}
