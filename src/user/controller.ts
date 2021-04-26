import { Request, Response } from 'express';
import { User } from '../models/user';
import * as service from './service';

export async function findByEmail(req: Request, res: Response) {
	try {
		const email: string = req.params['email'];
		const user: User = await service.findByEmail(email);

		res.status(200).json(user);

	} catch ({ message }) {
		res.status(500).json({ message });
	}
}