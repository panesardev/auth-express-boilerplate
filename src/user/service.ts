import { User, UserModel } from '../models/user';
import { v4 as uuid } from 'uuid';

export async function create(user: User) {
	user.id = uuid().toString();
	const { id, email } = await UserModel.create(user);
	return { id, email };
}

export async function update(user: User) {

}

export async function deleteById(id: string) {
	const result = await UserModel.deleteOne({ id }).exec();
}

export async function findByEmail(email: string) {
	return await UserModel.findOne({ email }).exec();
}