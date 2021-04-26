import { Schema, model, Document } from 'mongoose';
import * as Joi from 'joi';

export interface User {
	id?: string;
	email: string;
	password: string;
}

interface UserDoc extends Document {
	id?: string;
	email: string;
	password: string;
}

const UserSchema: Schema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	}
});

export const UserModel = model<UserDoc>('User', UserSchema);

// USER VALIDATION
export const UserValidationSchema: Joi.Schema<User> = Joi.object<User>({
	id: Joi.string()
		.alphanum()
		.optional(),

	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.required(),

	password: Joi.string()
		.min(6)
		.max(20)
		.required(),
});

