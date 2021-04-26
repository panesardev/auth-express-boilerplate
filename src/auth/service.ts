import { compare, hash } from 'bcrypt';
import { User } from '../models/user';
import { create, findByEmail } from '../user/service';
import { sign, Secret, verify } from 'jsonwebtoken';
import { LoginRequest, LoginResponse } from './interfaces';
import { RefreshToken, RefreshTokenModel } from '../models/refresh_token';

export async function register(user: User): Promise<Partial<User>> {
	// Encrypt password using salt value 10
	user.password = await hash(user.password, 10); 
	return await create(user);
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
	const userFound = await findByEmail(credentials.email);
	
	if (userFound && await compare(credentials.password, userFound.password)) 
		return {
			authToken:  generateAuthToken(userFound.id),
			refreshToken: await generateRefreshToken(userFound.id),
			timeStamp: new Date().toString(),
		};
	else 
		throw Error('Invalid credentials');
}

export async function refreshToken(token: string): Promise<LoginResponse> {
	if (!token) throw Error('Token not provided');

	const userId: string = checkRefreshToken(token);
	if (!userId) throw Error('Invalid token');

	const refreshTokenInDB: RefreshToken = await RefreshTokenModel.findOne({ token });

	if (!refreshTokenInDB) 
		throw Error('Invalid token');
	else 
		await RefreshTokenModel.deleteOne({ token });

	return {
		authToken:  generateAuthToken(userId),
		refreshToken: await generateRefreshToken(userId),
		timeStamp: new Date().toString(),
	};
}

export async function logout(token: string): Promise<string> {
	const refreshTokenInDB: RefreshToken = await RefreshTokenModel.findOne({ token });

	if (!refreshTokenInDB) 
		throw Error('Invalid token');
	else 
		await RefreshTokenModel.deleteOne({ token });
	
	return 'Logged out';
}

function generateAuthToken(userId: string): string {
	return sign({ id: userId }, process.env.JWT_AUTH_SECRET as Secret, 
		{ expiresIn: process.env.JWT_AUTH_EXPIRE });
}

export function checkAuthToken(token: string): any {
	return verify(token, process.env.JWT_AUTH_SECRET as Secret);
} 

async function generateRefreshToken(userId: string): Promise<string> {
	const token = sign({ id: userId }, process.env.JWT_REFRESH_SECRET as Secret, 
		{ expiresIn: process.env.JWT_REFRESH_EXPIRE });
	
	return (await RefreshTokenModel.create({ token })).token;
}

export function checkRefreshToken(token: string): any {
	return verify(token, process.env.JWT_REFRESH_SECRET as Secret);
}

