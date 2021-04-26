import { Schema, Document, model } from 'mongoose';

export interface RefreshToken {
	token: string;
}

interface RefreshTokenDoc extends Document {
	token: string;
}

const RefreshTokenSchema: Schema = new Schema({
	token: {
		type: String,
		required: true,
		unique: true,
	}
});

export const RefreshTokenModel = model<RefreshTokenDoc>('RefreshToken', RefreshTokenSchema);

