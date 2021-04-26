import { Request, Response } from 'express';
import { RefreshToken } from '../models/refresh_token';
import { AuthPayload, LoginRequest, LoginResponse } from './interfaces';
import * as service from './service';

export async function register(request: Request, response: Response) {
	try {
		await service.register(request.body);
		const payload: AuthPayload = {
			data: null,
			message: 'SUCCESS'
		};
		response.status(201).json(payload);

	} catch (e) {
		const payload: AuthPayload = {
			message: e.message,
			data: null,
		};
		response.status(401).json(payload);
	}
}

export async function login(request: Request, response: Response) {
	try {
		const credentials: LoginRequest = request.body;
		const loginResponse: LoginResponse = await service.login(credentials);

		const payload: AuthPayload = {
			message: 'SUCCESS', data: loginResponse
		};
		
		response.status(200).json(payload);
	
	} catch (e) {
		const payload: AuthPayload = {
			message: e.message,
			data: null,
		};
		response.status(401).json(payload);
	}
}

export async function refreshToken(request: Request, response: Response) {
	try {
		const { token }: RefreshToken = request.body;
		const loginResponse: LoginResponse = await service.refreshToken(token);

		const payload: AuthPayload = {
			message: 'SUCCESS', data: loginResponse
		};
		
		response.status(200).json(payload);

	} catch (e) {
		const payload: AuthPayload = {
			message: e.message,
			data: null,
		};
		response.status(401).json(payload);
	}
}

export async function logout(request: Request, response: Response) {
	try {
		const { token }: RefreshToken = request.body;
		const result: string = await service.logout(token);
		
		const payload: AuthPayload = {
			message: 'SUCCESS', data: result
		};
		
		response.status(200).json(payload);

	} catch (e) {
		const payload: AuthPayload = {
			message: e.message,
			data: null,
		};
		response.status(401).json(payload);
	}
}